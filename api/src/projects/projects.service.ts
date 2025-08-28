import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(createProjectInput: CreateProjectInput, creatorId: string) {
    return this.prisma.project.create({
      data: {
        ...createProjectInput,
        members: {
          create: {
            userId: creatorId,
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    });
  }

  async findAll(userId?: string) {
    if (userId) {
      return this.prisma.project.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        include: {
          members: {
            include: {
              user: true,
            },
          },
          tasks: true,
        },
      });
    }

    return this.prisma.project.findMany({
      include: {
        members: {
          include: {
            user: true,
          },
        },
        tasks: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        tasks: {
          include: {
            creator: true,
            assignee: true,
          },
        },
      },
    });
  }

  async addMember(projectId: string, userId: string) {
    const existingMember = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (existingMember) {
      throw new Error('User is already a member of this project');
    }

    await this.prisma.projectMember.create({
      data: {
        userId,
        projectId,
      },
    });

    return this.findOne(projectId);
  }

  async isProjectMember(projectId: string, userId: string): Promise<boolean> {
    const member = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    return !!member;
  }
}
