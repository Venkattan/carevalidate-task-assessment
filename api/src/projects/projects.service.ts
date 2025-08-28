import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectInput } from './dto/project.dto';

@Injectable()
export class ProjectsService {
  private readonly logger = new Logger(ProjectsService.name);

  constructor(private prisma: PrismaService) {}

  async create(createProjectInput: CreateProjectInput, creatorId: string) {
    const startTime = Date.now();
    
    const project = await this.prisma.project.create({
      data: {
        ...createProjectInput,
        members: {
          create: {
            userId: creatorId,
          },
        },
      },
      // Use selective includes to reduce data transfer
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        members: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
      },
    });

    this.logger.debug(`Project creation took ${Date.now() - startTime}ms`);
    return project;
  }

  async findAll(userId?: string) {
    const startTime = Date.now();
    
    let projects;
    
    if (userId) {
      // Optimized query using the projectMember index
      projects = await this.prisma.project.findMany({
        where: {
          members: {
            some: {
              userId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          members: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
            },
          },
          // Get basic task count instead of full task data
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
    } else {
      projects = await this.prisma.project.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          members: {
            select: {
              id: true,
              userId: true,
              user: {
                select: {
                  id: true,
                  email: true,
                  name: true,
                },
              },
            },
          },
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        orderBy: { updatedAt: 'desc' },
      });
    }

    this.logger.debug(`Project findAll took ${Date.now() - startTime}ms for ${projects.length} projects`);
    
    // Transform the result to include task count in a more accessible way
    return projects.map(project => ({
      ...project,
      taskCount: project._count.tasks,
      _count: undefined, // Remove the _count field from the result
    }));
  }

  async findOne(id: string) {
    const startTime = Date.now();
    
    const project = await this.prisma.project.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        members: {
          select: {
            id: true,
            userId: true,
            user: {
              select: {
                id: true,
                email: true,
                name: true,
              },
            },
          },
        },
        // Get limited task data with optimized fields
        tasks: {
          select: {
            id: true,
            title: true,
            status: true,
            priority: true,
            dueDate: true,
            createdAt: true,
            createdBy: true,
            assignedTo: true,
          },
          orderBy: [
            { priority: 'desc' },
            { createdAt: 'desc' }
          ],
          take: 50, // Limit to prevent huge payloads
        },
      },
    });

    this.logger.debug(`Project findOne took ${Date.now() - startTime}ms`);
    return project;
  }

  async addMember(projectId: string, userId: string) {
    const startTime = Date.now();
    
    // Check for existing member with optimized query
    const existingMember = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      select: { id: true }, // Only select what we need
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

    this.logger.debug(`Add project member took ${Date.now() - startTime}ms`);
    
    return this.findOne(projectId);
  }

  async isProjectMember(projectId: string, userId: string): Promise<boolean> {
    const startTime = Date.now();
    
    // Optimized query - uses composite index and only checks existence
    const member = await this.prisma.projectMember.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
      select: { id: true }, // Minimal data transfer
    });

    this.logger.debug(`Project member check took ${Date.now() - startTime}ms`);
    return !!member;
  }

  // New optimized method for getting user's project count
  async getUserProjectCount(userId: string): Promise<number> {
    const startTime = Date.now();
    
    const count = await this.prisma.projectMember.count({
      where: { userId },
    });

    this.logger.debug(`User project count took ${Date.now() - startTime}ms`);
    return count;
  }

  // New method for bulk project member validation
  async validateProjectMembers(projectId: string, userIds: string[]): Promise<{ [userId: string]: boolean }> {
    const startTime = Date.now();
    
    const members = await this.prisma.projectMember.findMany({
      where: {
        projectId,
        userId: { in: userIds },
      },
      select: { userId: true },
    });

    const memberMap = new Set(members.map(m => m.userId));
    const result: { [userId: string]: boolean } = {};
    
    userIds.forEach(userId => {
      result[userId] = memberMap.has(userId);
    });

    this.logger.debug(`Bulk member validation took ${Date.now() - startTime}ms for ${userIds.length} users`);
    return result;
  }
}
