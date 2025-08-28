import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(taskId: string, content: string, authorId: string) {
    return this.prisma.taskComment.create({
      data: {
        taskId,
        content,
        authorId,
      },
      include: {
        author: true,
        task: true,
      },
    });
  }

  async findByTaskId(taskId: string) {
    return this.prisma.taskComment.findMany({
      where: { taskId },
      include: {
        author: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
}
