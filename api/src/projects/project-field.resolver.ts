import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { Project } from './dto/project.dto';
import { User } from '../auth/dto/auth.type';
import { DataLoaderService } from '../common/dataloader/dataloader.service';
import { PrismaService } from '../prisma/prisma.service';

@Resolver(() => Project)
export class ProjectFieldResolver {
  constructor(
    private dataLoaderService: DataLoaderService,
    private prisma: PrismaService,
  ) {}

  @ResolveField(() => [User])
  async members(@Parent() project: Project, @Context() context: any): Promise<User[]> {
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    
    // Get project members from the ProjectMember junction table
    const projectMembers = await this.prisma.projectMember.findMany({
      where: { projectId: project.id },
      select: { userId: true },
    });

    const userIds = projectMembers.map(pm => pm.userId);
    
    // Use DataLoader to batch load users
    const users = await Promise.all(
      userIds.map(userId => dataLoader.userLoader.load(userId))
    );

    return users.filter(user => user !== null);
  }
}
