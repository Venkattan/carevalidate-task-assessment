import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Task, TaskComment } from './dto/task.dto';
import { User } from '../auth/dto/auth.type';
import { Project } from '../projects/dto/project.dto';
import { DataLoaderService } from '../common/dataloader/dataloader.service';

@Resolver(() => Task)
export class TaskFieldResolver {
  constructor(private dataLoaderService: DataLoaderService) {}

  @ResolveField(() => User)
  async creator(@Parent() task: Task, @Context() context: any): Promise<User> {
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    return dataLoader.userLoader.load(task.createdBy);
  }

  @ResolveField(() => User, { nullable: true })
  async assignee(@Parent() task: Task, @Context() context: any): Promise<User | null> {
    if (!task.assignedTo) return null;
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    return dataLoader.userLoader.load(task.assignedTo);
  }

  @ResolveField(() => Project)
  async project(@Parent() task: Task, @Context() context: any): Promise<Project> {
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    return dataLoader.projectLoader.load(task.projectId);
  }

  @ResolveField(() => [TaskComment], { nullable: true })
  async comments(@Parent() task: Task, @Context() context: any): Promise<TaskComment[]> {
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    const comments = await dataLoader.commentsByTaskWithAuthorLoader.load(task.id);
    
    // Map the comments to include the task reference for the GraphQL schema
    return comments.map(comment => ({
      ...comment,
      task: task,
    }));
  }
}
