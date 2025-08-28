import { Injectable, Logger } from '@nestjs/common';
import DataLoader from 'dataloader';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DataLoaderService {
  private readonly logger = new Logger(DataLoaderService.name);

  public readonly userLoader: DataLoader<string, any>;
  public readonly projectLoader: DataLoader<string, any>;
  public readonly taskLoader: DataLoader<string, any>;
  public readonly tasksByProjectLoader: DataLoader<string, any[]>;
  public readonly commentsByTaskLoader: DataLoader<string, any[]>;
  public readonly commentsByTaskWithAuthorLoader: DataLoader<string, any[]>;
  public readonly commentCountsByTaskLoader: DataLoader<string, number>;
  public readonly taskCountsByProjectLoader: DataLoader<string, number>;
  public readonly usersByProjectLoader: DataLoader<string, any[]>;

  constructor(private prisma: PrismaService) {
    // User DataLoader with optimized field selection
    this.userLoader = new DataLoader(
      async (userIds: readonly string[]) => {
        const startTime = Date.now();
        
        const users = await this.prisma.user.findMany({
          where: { id: { in: [...userIds] } },
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true,
          },
        });

        this.logger.debug(`UserLoader batch: ${userIds.length} users in ${Date.now() - startTime}ms`);

        const userMap = new Map(users.map(user => [user.id, user]));
        return userIds.map(id => userMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
        cacheKeyFn: (key) => `user:${key}`,
      }
    );

    // Project DataLoader with optimized field selection
    this.projectLoader = new DataLoader(
      async (projectIds: readonly string[]) => {
        const startTime = Date.now();
        
        const projects = await this.prisma.project.findMany({
          where: { id: { in: [...projectIds] } },
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
          },
        });

        this.logger.debug(`ProjectLoader batch: ${projectIds.length} projects in ${Date.now() - startTime}ms`);

        const projectMap = new Map(projects.map(project => [project.id, project]));
        return projectIds.map(id => projectMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
        cacheKeyFn: (key) => `project:${key}`,
      }
    );

    // Task DataLoader with optimized field selection
    this.taskLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const startTime = Date.now();
        
        const tasks = await this.prisma.task.findMany({
          where: { id: { in: [...taskIds] } },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            assignedTo: true,
            projectId: true,
          },
        });

        this.logger.debug(`TaskLoader batch: ${taskIds.length} tasks in ${Date.now() - startTime}ms`);

        const taskMap = new Map(tasks.map(task => [task.id, task]));
        return taskIds.map(id => taskMap.get(id) || null);
      },
      {
        cache: true,
        maxBatchSize: 100,
        cacheKeyFn: (key) => `task:${key}`,
      }
    );

    // Tasks by Project DataLoader - optimized with better sorting
    this.tasksByProjectLoader = new DataLoader(
      async (projectIds: readonly string[]) => {
        const startTime = Date.now();
        
        const tasks = await this.prisma.task.findMany({
          where: { projectId: { in: [...projectIds] } },
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            updatedAt: true,
            createdBy: true,
            assignedTo: true,
            projectId: true,
          },
          orderBy: [
            { priority: 'desc' },
            { createdAt: 'desc' }
          ],
        });

        this.logger.debug(`TasksByProjectLoader batch: ${projectIds.length} projects, ${tasks.length} tasks in ${Date.now() - startTime}ms`);

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
        cacheKeyFn: (key) => `tasks_by_project:${key}`,
      }
    );

    // Comments by Task DataLoader
    this.commentsByTaskLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const startTime = Date.now();
        
        const comments = await this.prisma.taskComment.findMany({
          where: { taskId: { in: [...taskIds] } },
          select: {
            id: true,
            content: true,
            createdAt: true,
            taskId: true,
            authorId: true,
          },
          orderBy: { createdAt: 'asc' },
        });

        this.logger.debug(`CommentsByTaskLoader batch: ${taskIds.length} tasks, ${comments.length} comments in ${Date.now() - startTime}ms`);

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
        cacheKeyFn: (key) => `comments_by_task:${key}`,
      }
    );

    // Comments by Task with Author DataLoader - optimized
    this.commentsByTaskWithAuthorLoader = new DataLoader(
      async (taskIds: readonly string[]) => {
        const startTime = Date.now();
        
        const comments = await this.prisma.taskComment.findMany({
          where: { taskId: { in: [...taskIds] } },
          select: {
            id: true,
            content: true,
            createdAt: true,
            taskId: true,
            authorId: true,
            author: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
          orderBy: { createdAt: 'asc' },
        });

        this.logger.debug(`CommentsByTaskWithAuthorLoader batch: ${taskIds.length} tasks, ${comments.length} comments in ${Date.now() - startTime}ms`);

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
        cacheKeyFn: (key) => `comments_with_author_by_task:${key}`,
      }
    );

    // New: Comment counts by task DataLoader
    this.commentCountsByTaskLoader = new DataLoader<string, number>(
      async (taskIds: readonly string[]): Promise<number[]> => {
        const startTime = Date.now();
        
        const counts = await this.prisma.taskComment.groupBy({
          by: ['taskId'],
          where: {
            taskId: { in: [...taskIds] },
          },
          _count: {
            taskId: true,
          },
        });

        this.logger.debug(`CommentCountsByTaskLoader batch: ${taskIds.length} tasks in ${Date.now() - startTime}ms`);

        const countMap = new Map(counts.map(count => [count.taskId, count._count.taskId as number]));
        return taskIds.map(taskId => countMap.get(taskId) || 0);
      },
      {
        cache: true,
        maxBatchSize: 100,
        cacheKeyFn: (key) => `comment_count_by_task:${key}`,
      }
    );

    // New: Task counts by project DataLoader
    this.taskCountsByProjectLoader = new DataLoader<string, number>(
      async (projectIds: readonly string[]): Promise<number[]> => {
        const startTime = Date.now();
        
        const counts = await this.prisma.task.groupBy({
          by: ['projectId'],
          where: {
            projectId: { in: [...projectIds] },
          },
          _count: {
            projectId: true,
          },
        });

        this.logger.debug(`TaskCountsByProjectLoader batch: ${projectIds.length} projects in ${Date.now() - startTime}ms`);

        const countMap = new Map(counts.map(count => [count.projectId, count._count.projectId as number]));
        return projectIds.map(projectId => countMap.get(projectId) || 0);
      },
      {
        cache: true,
        maxBatchSize: 50,
        cacheKeyFn: (key) => `task_count_by_project:${key}`,
      }
    );

    // New: Users by project DataLoader
    this.usersByProjectLoader = new DataLoader(
      async (projectIds: readonly string[]) => {
        const startTime = Date.now();
        
        const members = await this.prisma.projectMember.findMany({
          where: { projectId: { in: [...projectIds] } },
          select: {
            projectId: true,
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        });

        this.logger.debug(`UsersByProjectLoader batch: ${projectIds.length} projects, ${members.length} members in ${Date.now() - startTime}ms`);

        const usersByProject = new Map<string, any[]>();
        
        // Initialize all projects with empty arrays
        projectIds.forEach(projectId => {
          usersByProject.set(projectId, []);
        });

        // Group users by project
        members.forEach(member => {
          const existing = usersByProject.get(member.projectId) || [];
          existing.push(member.user);
          usersByProject.set(member.projectId, existing);
        });

        return projectIds.map(projectId => usersByProject.get(projectId) || []);
      },
      {
        cache: true,
        maxBatchSize: 50,
        cacheKeyFn: (key) => `users_by_project:${key}`,
      }
    );
  }

  // Enhanced cache management with selective clearing
  clearUserCache(userId: string): void {
    this.userLoader.clear(userId);
  }

  clearProjectCache(projectId: string): void {
    this.projectLoader.clear(projectId);
    this.tasksByProjectLoader.clear(projectId);
    this.taskCountsByProjectLoader.clear(projectId);
    this.usersByProjectLoader.clear(projectId);
  }

  clearTaskCache(taskId: string): void {
    this.taskLoader.clear(taskId);
    this.commentsByTaskLoader.clear(taskId);
    this.commentsByTaskWithAuthorLoader.clear(taskId);
    this.commentCountsByTaskLoader.clear(taskId);
  }

  // New: Clear cache when task is created/updated/deleted
  clearTaskRelatedCaches(taskId: string, projectId: string): void {
    this.clearTaskCache(taskId);
    this.tasksByProjectLoader.clear(projectId);
    this.taskCountsByProjectLoader.clear(projectId);
  }

  // New: Clear cache when comment is added
  clearCommentRelatedCaches(taskId: string): void {
    this.commentsByTaskLoader.clear(taskId);
    this.commentsByTaskWithAuthorLoader.clear(taskId);
    this.commentCountsByTaskLoader.clear(taskId);
  }

  // Clear all caches (useful for testing or after bulk operations)
  clearAllCaches(): void {
    this.userLoader.clearAll();
    this.projectLoader.clearAll();
    this.taskLoader.clearAll();
    this.tasksByProjectLoader.clearAll();
    this.commentsByTaskLoader.clearAll();
    this.commentsByTaskWithAuthorLoader.clearAll();
    this.commentCountsByTaskLoader.clearAll();
    this.taskCountsByProjectLoader.clearAll();
    this.usersByProjectLoader.clearAll();
  }

  // New: Prime cache with data (useful after bulk operations)
  primeUserCache(users: any[]): void {
    users.forEach(user => {
      this.userLoader.prime(user.id, user);
    });
  }

  primeTaskCache(tasks: any[]): void {
    tasks.forEach(task => {
      this.taskLoader.prime(task.id, task);
    });
  }

  primeProjectCache(projects: any[]): void {
    projects.forEach(project => {
      this.projectLoader.prime(project.id, project);
    });
  }
}
