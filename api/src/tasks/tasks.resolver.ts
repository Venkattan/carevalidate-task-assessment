import { Resolver, Query, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { TasksService } from './tasks.service';
import { ProjectsService } from '../projects/projects.service';
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

const pubSub = new PubSub();

@Resolver(() => Task)
export class TasksResolver {
  constructor(
    private tasksService: TasksService,
    private projectsService: ProjectsService,
  ) {}

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, ProjectMemberGuard)
  @RequireProjectMember()
  async createTask(
    @Args('input') createTaskInput: CreateTaskInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    const task = await this.tasksService.create(createTaskInput, userId);
    
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
  async task(@Args('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  async updateTask(
    @Args('id') id: string,
    @Args('input') updateTaskInput: UpdateTaskInput,
  ) {
    const updatedTask = await this.tasksService.update(id, updateTaskInput);
    
    // Publish task update event
    pubSub.publish('taskUpdated', {
      taskUpdated: updatedTask,
      projectId: updatedTask.project.id,
    });

    return updatedTask;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  async deleteTask(@Args('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) {
      throw new Error('Task not found');
    }

    const deleted = await this.tasksService.delete(id);
    
    if (deleted) {
      // Publish task deletion event
      pubSub.publish('taskDeleted', {
        taskDeleted: id,
        projectId: task.project.id,
      });
    }

    return deleted;
  }

  @Mutation(() => Task)
  @UseGuards(GqlAuthGuard, TaskAccessGuard)
  async assignTask(
    @Args('taskId') taskId: string,
    @Args('userId') userId: string,
  ) {
    const updatedTask = await this.tasksService.assignTask(taskId, userId);
    
    // Publish task update event
    pubSub.publish('taskUpdated', {
      taskUpdated: updatedTask,
      projectId: updatedTask.project.id,
    });

    return updatedTask;
  }

  // Subscriptions
  @Subscription(() => Task, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  taskCreated(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskCreated');
  }

  @Subscription(() => Task, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  taskUpdated(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskUpdated');
  }

  @Subscription(() => String, {
    filter: (payload, variables) => {
      return payload.projectId === variables.projectId;
    },
  })
  taskDeleted(@Args('projectId') projectId: string) {
    return pubSub.asyncIterableIterator('taskDeleted');
  }
}
