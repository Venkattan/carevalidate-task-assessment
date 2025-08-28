import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskInput, UpdateTaskInput, TaskConnection, TaskStatus } from './dto/task.dto';

@Injectable()
export class TasksService {
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
    const task = await this.prisma.task.create({
      data: {
        ...createTaskInput,
        createdBy: creatorId,
      },
    });

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async findAll(filters: {
    projectId?: string;
    status?: TaskStatus;
    assignedTo?: string;
    limit?: number;
    offset?: number;
  }): Promise<TaskConnection> {
    const { projectId, status, assignedTo, limit = 10, offset = 0 } = filters;

    const where: any = {};
    if (projectId) where.projectId = projectId;
    if (status) where.status = status;
    if (assignedTo) where.assignedTo = assignedTo;

    const [tasks, totalCount] = await Promise.all([
      this.prisma.task.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      this.prisma.task.count({ where }),
    ]);

    // Map the Prisma types to our GraphQL types - field resolvers will handle relationships
    const edges = tasks.map((task, index) => ({
      node: this.mapTaskToGraphQL(task),
      cursor: Buffer.from(`${offset + index}`).toString('base64'),
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
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) return null;

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    const task = await this.prisma.task.update({
      where: { id },
      data: updateTaskInput,
    });

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.task.delete({
        where: { id },
      });
      return true;
    } catch {
      return false;
    }
  }

  async assignTask(taskId: string, userId: string) {
    const task = await this.prisma.task.update({
      where: { id: taskId },
      data: { assignedTo: userId },
    });

    // Return task without includes - field resolvers will handle relationships
    return this.mapTaskToGraphQL(task);
  }
}
