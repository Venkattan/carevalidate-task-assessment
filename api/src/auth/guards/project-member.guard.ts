import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProjectMemberGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const args = ctx.getArgs();
    const user = request.user;

    if (!user) {
      return false;
    }

    // Extract projectId from various possible argument locations
    const projectId = args.projectId || args.input?.projectId;
    if (!projectId) {
      return false;
    }

    // Check if user is a member of the project
    const membership = await this.prisma.projectMember.findFirst({
      where: {
        userId: user.id,
        projectId: projectId,
      },
    });

    return !!membership;
  }
}
