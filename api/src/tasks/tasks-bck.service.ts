import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput, TaskConnection, TaskStatus } from './dto/task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(private prisma: PrismaService) {}

  // Helper to map Prisma task -> GraphQL Task type
  private mapTaskToGraphQL(task: any) {
    return {
      ...task,
      status: task.status as TaskStatus,
      priority: task.priority as any,
      description: task.description ?? undefined,
      dueDate: task.dueDate ?? undefined,
      assignedTo: task.assignedTo ?? undefined,
      // Field resolvers will handle these relationships:
      // creator, assignee, project, comments
    };
  }

  async create(createTaskInput: CreateTaskInput, creatorId: string) {
    const startTime = Date.now();
    
    const task = await this.prisma.task.create({
      data: {
        ...createTaskInput,
        createdBy: creatorId,
      },
    });

    this.logger.debug(`Task creation took ${Date.now() - startTime}ms`);
    
    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async findAll(filters: {
    projectId?: string;
    status?: TaskStatus;
    assignedTo?: string;
    limit?: number;
    offset?: number;
    sortBy?: 'createdAt' | 'updatedAt' | 'dueDate' | 'priority' | 'title';
    sortOrder?: 'asc' | 'desc';
  }): Promise<TaskConnection> {
    const startTime = Date.now();
    const { 
      projectId, 
      status, 
      assignedTo, 
      limit = 10, 
      offset = 0,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = filters;

    // Build optimized where clause - Prisma will use composite indexes
    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;

    // Build optimized orderBy - align with our indexes
    const orderBy: any = {};
    if (sortBy === 'priority') {
      // Use priority index with secondary sort by dueDate (matches our composite index)
      orderBy.priority = sortOrder;
      orderBy.dueDate = 'asc'; // Secondary sort for tie-breaking
    } else {
      orderBy[sortBy] = sortOrder;
    }

    // Use Promise.all for parallel execution (when possible)
    const [tasks, totalCount] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy,
        take: limit,
        skip: offset,
        // Only select fields we need to reduce data transfer
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
      }),
      this.prisma.task.count({ where }),
    ]);

    this.logger.debug(`Task query took ${Date.now() - startTime}ms for ${tasks.length} tasks`);

    // Use cursor-based pagination for better performance on large datasets
    const edges = tasks.map((task, index) => ({
      node: this.mapTaskToGraphQL(task),
      cursor: Buffer.from(`${task.createdAt.getTime()}-${task.id}`).toString('base64'),
    }));

    const hasNextPage = offset + limit < totalCount;
    const hasPreviousPage = offset > 0;

    return {
      edges,
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        startCursor: edges[0]?.cursor,
        endCursor: edges[edges.length - 1]?.cursor,
      },
      totalCount,
    };
  }

  async findOne(id: string) {
    const startTime = Date.now();
    
    const task = await this.prisma.task.findUnique({
      where: { id },
      // Only select fields we need
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

    this.logger.debug(`Task findOne took ${Date.now() - startTime}ms`);

    if (!task) return null;

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    const startTime = Date.now();
    
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskInput,
      // Only select fields we need
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

    this.logger.debug(`Task update took ${Date.now() - startTime}ms`);

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async delete(id: string): Promise<boolean> {
    const startTime = Date.now();
    
    try {
      await this.prisma.task.delete({
        where: { id },
      });
      
      this.logger.debug(`Task deletion took ${Date.now() - startTime}ms`);
      return true;
    } catch (error) {
      this.logger.error(`Task deletion failed: ${error.message}`);
      return false;
    }
  }

  async assignTask(taskId: string, userId: string) {
    const startTime = Date.now();
    
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { assignedTo: userId },
      // Only select fields we need
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

    this.logger.debug(`Task assignment took ${Date.now() - startTime}ms`);

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  // New optimized method for bulk operations
  async findTasksByProject(
    projectId: string, 
    options?: {
      status?: TaskStatus;
      assignedTo?: string;
      limit?: number;
      includeCompleted?: boolean;
    }
  ) {
    const startTime = Date.now();
    const { status, assignedTo, limit, includeCompleted = true } = options || {};

    const where: any = { projectId };
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;
    if (!includeCompleted) {
      where.status = { not: 'DONE' };
    }

    // This query will use the projectId index or composite indexes
    const tasks = await this.prisma.task.findMany({
      where,
      orderBy: [
        { priority: 'desc' }, // High priority first
        { createdAt: 'desc' }  // Then by creation date
      ],
      take: limit,
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

    this.logger.debug(`Project tasks query took ${Date.now() - startTime}ms for ${tasks.length} tasks`);

    return tasks.map(task => this.mapTaskToGraphQL(task));
  }

  // Optimized method for dashboard/analytics queries
  async getTaskStatsByProject(projectId: string) {
    const startTime = Date.now();
    
    // Use aggregation for better performance
    const stats = await this.prisma.task.groupBy({
      by: ['status'],
      where: { projectId },
      _count: {
        status: true,
      },
    });

    this.logger.debug(`Task stats query took ${Date.now() - startTime}ms`);

    // Transform to more usable format
    const result = {
      total: 0,
      todo: 0,
      inProgress: 0,
      review: 0,
      done: 0,
    };

    stats.forEach(stat => {
      const count = stat._count.status;
      result.total += count;
      
      switch (stat.status) {
        case 'TODO':
          result.todo = count;
          break;
        case 'IN_PROGRESS':
          result.inProgress = count;
          break;
        case 'REVIEW':
          result.review = count;
          break;
        case 'DONE':
          result.done = count;
          break;
      }
    });

    return result;
  }
}
