import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CommentAccessGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const args = ctx.getArgs();
    const user = request.user;

    if (!user) {
      return false;
    }

    // Extract taskId from various possible argument locations
    const taskId = args.taskId || args.input?.taskId;
    if (!taskId) {
      return false;
    }

    // Get task with project and project members
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
      include: {
        project: {
          include: {
            members: true,
          },
        },
      },
    });

    if (!task) {
      return false;
    }

    // Check if user is a member of the project that contains this task
    const isMember = task.project.members.some(
      (member) => member.userId === user.id
    );

    return isMember;
  }
}
