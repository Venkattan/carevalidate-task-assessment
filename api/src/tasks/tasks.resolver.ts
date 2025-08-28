import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { PubSub } from 'graphql-subscriptions';
import { TasksService } from './tasks.service';
import { ProjectsService } from '../projects/projects.service';
import { DataLoaderService } from '../common/dataloader/dataloader.service';
import {
  CreateTaskInput,
  UpdateTaskInput,
  Task,
  TaskConnection,
  TaskStatus,
} from './dto/task.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ProjectMemberGuard } from '../auth/guards/project-member.guard';
import { TaskAccessGuard } from '../auth/guards/task-access.guard';
import { RequireProjectMember } from '../auth/decorators/project-member.decorator';
import { MediumRateLimit, HighRateLimit, LowRateLimit } from '../common/decorators/rate-limit.decorator';

const pubSub = new PubSub();

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
    private dataLoaderService: DataLoaderService,
  ) {}

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, ProjectMemberGuard)
  @RequireProjectMember()
  @MediumRateLimit() // 20 requests per minute for task creation
  async createTask(
    @Args('input') createTaskInput: CreateTaskInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    const task = await this.tasksService.create(createTaskInput, userId);
    
    // Clear relevant caches
    this.dataLoaderService.clearProjectCache(createTaskInput.projectId);
    
    // Publish task creation event
    pubSub.publish('taskCreated', {
      taskCreated: task,
      projectId: createTaskInput.projectId,
    });

    return task;
  }

  @Query(() => TaskConnection)
  @UseGuards(GqlAuthGuard, ProjectMemberGuard)
  @RequireProjectMember()
  @HighRateLimit() // 100 requests per minute for reading tasks
  async tasks(
    @Args('projectId') projectId: string,
    @Args('status', { nullable: true }) status?: TaskStatus,
    @Args('assignedTo', { nullable: true }) assignedTo?: string,
    @Args('limit', { defaultValue: 10 }) limit?: number,
    @Args('offset', { defaultValue: 0 }) offset?: number,
  ) {
    return this.tasksService.findAll({
      projectId,
      status,
      assignedTo,
      limit,
      offset,
    });
  }

  @Query(() => Task, { nullable: true })
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  @HighRateLimit() // 100 requests per minute for reading individual tasks
  async task(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  @MediumRateLimit() // 20 requests per minute for task updates
  async updateTask(
    @Args('id') id: string,
    @Args('input') updateTaskInput: UpdateTaskInput,
  ) {
    const updatedTask = await this.tasksService.update(id, updateTaskInput);
    
    // Clear relevant caches
    this.dataLoaderService.clearTaskCache(id);
    this.dataLoaderService.clearProjectCache(updatedTask.projectId);
    
    // Publish task update event
    pubSub.publish('taskUpdated', {
      taskUpdated: updatedTask,
      projectId: updatedTask.projectId,
    });

    return updatedTask;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  @LowRateLimit() // 5 requests per minute for task deletion (more restrictive)
  async deleteTask(@Args('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const deleted = await this.tasksService.delete(id);
    
    if (deleted) {
      // Clear relevant caches
      this.dataLoaderService.clearTaskCache(id);
      this.dataLoaderService.clearProjectCache(task.projectId);
      
      // Publish task deletion event
      pubSub.publish('taskDeleted', {
        taskDeleted: id,
        projectId: task.projectId,
      });
    }

    return deleted;
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  @MediumRateLimit() // 20 requests per minute for task assignment
  async assignTask(
    @Args('taskId') taskId: string,
    @Args('userId') userId: string,
  ) {
    const updatedTask = await this.tasksService.assignTask(taskId, userId);
    
    // Clear relevant caches
    this.dataLoaderService.clearTaskCache(taskId);
    this.dataLoaderService.clearProjectCache(updatedTask.projectId);
    
    // Publish task update event
    pubSub.publish('taskUpdated', {
      taskUpdated: updatedTask,
      projectId: updatedTask.projectId,
    });

    return updatedTask;
  }

  // Subscriptions - Skip throttling for real-time features
  @Subscription(() => Task, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  @SkipThrottle()
  taskCreated(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskCreated');
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  @SkipThrottle()
  taskUpdated(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskUpdated');
  }

  @Subscription(() => String, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  @SkipThrottle()
  taskDeleted(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskDeleted');
  }
}
