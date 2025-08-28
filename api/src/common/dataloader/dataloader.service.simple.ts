import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DataLoaderService {
  public readonly userLoader: DataLoader<string, any>;
  public readonly projectLoader: DataLoader<string, any>;
  public readonly taskLoader: DataLoader<string, any>;
  public readonly tasksByProjectLoader: DataLoader<string, any[]>;
  public readonly commentsByTaskLoader: DataLoader<string, any[]>;
  public readonly commentsByTaskWithAuthorLoader: DataLoader<string, any[]>;

  constructor(private prisma: PrismaService) {
    // User DataLoader
    this.userLoader = new DataLoader(
      async (userIds: readonly string[]) => {
        const users = await this.prisma.user.findMany({
          where: { id: { in: [...userIds] } },
        });

        const userMap = new Map(users.map(user => [user.id, user]));
        return userIds.map(id => userMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );

    // Project DataLoader
    this.projectLoader = new DataLoader(
      async (projectIds: readonly string[]) => {
        const projects = await this.prisma.project.findMany({
          where: { id: { in: [...projectIds] } },
        });

        const projectMap = new Map(projects.map(project => [project.id, project]));
        return projectIds.map(id => projectMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );

    // Task DataLoader
    this.taskLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const tasks = await this.prisma.task.findMany({
          where: { id: { in: [...taskIds] } },
        });

        const taskMap = new Map(tasks.map(task => [task.id, task]));
        return taskIds.map(id => taskMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
      }
    );

    // Tasks by Project DataLoader
    this.tasksByProjectLoader = new DataLoader(
      async (projectIds: readonly string[]) => {
        const tasks = await this.prisma.task.findMany({
          where: { projectId: { in: [...projectIds] } },
          orderBy: { createdAt: 'desc' },
        });

        const tasksByProject = new Map<string, any[]>();
        
        // Initialize all projects with empty arrays
        projectIds.forEach(projectId => {
          tasksByProject.set(projectId, []);
        });

        // Group tasks by project
        tasks.forEach(task => {
          const existing = tasksByProject.get(task.projectId) || [];
          existing.push(task);
          tasksByProject.set(task.projectId, existing);
        });

        return projectIds.map(projectId => tasksByProject.get(projectId) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );

    // Comments by Task DataLoader
    this.commentsByTaskLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const comments = await this.prisma.taskComment.findMany({
          where: { taskId: { in: [...taskIds] } },
          orderBy: { createdAt: 'asc' },
        });

        const commentsByTask = new Map<string, any[]>();
        
        // Initialize all tasks with empty arrays
        taskIds.forEach(taskId => {
          commentsByTask.set(taskId, []);
        });

        // Group comments by task
        comments.forEach(comment => {
          const existing = commentsByTask.get(comment.taskId) || [];
          existing.push(comment);
          commentsByTask.set(comment.taskId, existing);
        });

        return taskIds.map(taskId => commentsByTask.get(taskId) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );

    // Comments by Task with Author DataLoader
    this.commentsByTaskWithAuthorLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const comments = await this.prisma.taskComment.findMany({
          where: { taskId: { in: [...taskIds] } },
          include: { author: true },
          orderBy: { createdAt: 'asc' },
        });

        const commentsByTask = new Map<string, any[]>();
        
        // Initialize all tasks with empty arrays
        taskIds.forEach(taskId => {
          commentsByTask.set(taskId, []);
        });

        // Group comments by task
        comments.forEach(comment => {
          const existing = commentsByTask.get(comment.taskId) || [];
          existing.push(comment);
          commentsByTask.set(comment.taskId, existing);
        });

        return taskIds.map(taskId => commentsByTask.get(taskId) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
      }
    );
  }

  // Clear cache for a specific user
  clearUserCache(userId: string): void {
    this.userLoader.clear(userId);
  }

  // Clear cache for a specific project
  clearProjectCache(projectId: string): void {
    this.projectLoader.clear(projectId);
    this.tasksByProjectLoader.clear(projectId);
  }

  // Clear cache for a specific task
  clearTaskCache(taskId: string): void {
    this.taskLoader.clear(taskId);
    this.commentsByTaskLoader.clear(taskId);
    this.commentsByTaskWithAuthorLoader.clear(taskId);
  }

  // Clear all caches (useful for testing or after bulk operations)
  clearAllCaches(): void {
    this.userLoader.clearAll();
    this.projectLoader.clearAll();
    this.taskLoader.clearAll();
    this.tasksByProjectLoader.clearAll();
    this.commentsByTaskLoader.clearAll();
    this.commentsByTaskWithAuthorLoader.clearAll();
  }
}
