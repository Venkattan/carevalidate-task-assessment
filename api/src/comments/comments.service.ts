import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  private readonly logger = new Logger(CommentsService.name);

  constructor(private prisma: PrismaService) {}

  async create(taskId: string, content: string, authorId: string) {
    const startTime = Date.now();
    
    const comment = await this.prisma.taskComment.create({
      data: {
        taskId,
        content,
        authorId,
      },
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
        task: {
          select: {
            id: true,
            title: true,
            projectId: true,
          },
        },
      },
    });

    this.logger.debug(`Comment creation took ${Date.now() - startTime}ms`);
    return comment;
  }

  async findByTaskId(taskId: string, options?: { limit?: number; offset?: number }) {
    const startTime = Date.now();
    const { limit, offset } = options || {};
    
    const comments = await this.prisma.taskComment.findMany({
      where: { taskId },
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
      take: limit,
      skip: offset,
    });

    this.logger.debug(`Comments query took ${Date.now() - startTime}ms for ${comments.length} comments`);
    return comments;
  }

  // New optimized method for getting comment counts
  async getCommentCountByTask(taskId: string): Promise<number> {
    const startTime = Date.now();
    
    const count = await this.prisma.taskComment.count({
      where: { taskId },
    });

    this.logger.debug(`Comment count took ${Date.now() - startTime}ms`);
    return count;
  }

  // Bulk method for getting comment counts for multiple tasks
  async getCommentCountsByTasks(taskIds: string[]): Promise<{ [taskId: string]: number }> {
    const startTime = Date.now();
    
    const counts = await this.prisma.taskComment.groupBy({
      by: ['taskId'],
      where: {
        taskId: { in: taskIds },
      },
      _count: {
        taskId: true,
      },
    });

    const result: { [taskId: string]: number } = {};
    
    // Initialize all tasks with 0 count
    taskIds.forEach(taskId => {
      result[taskId] = 0;
    });

    // Fill in actual counts
    counts.forEach(count => {
      result[count.taskId] = count._count.taskId;
    });

    this.logger.debug(`Bulk comment counts took ${Date.now() - startTime}ms for ${taskIds.length} tasks`);
    return result;
  }

  // Method for getting recent comments across projects
  async getRecentComments(projectIds: string[], limit: number = 10) {
    const startTime = Date.now();
    
    const comments = await this.prisma.taskComment.findMany({
      where: {
        task: {
          projectId: { in: projectIds },
        },
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        task: {
          select: {
            id: true,
            title: true,
            projectId: true,
            project: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    this.logger.debug(`Recent comments query took ${Date.now() - startTime}ms for ${comments.length} comments`);
    return comments;
  }
}
