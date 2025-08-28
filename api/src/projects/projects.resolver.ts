import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, Project } from './dto/project.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { ProjectMemberGuard } from '../auth/guards/project-member.guard';
import { RequireProjectMember } from '../auth/decorators/project-member.decorator';
import { LowRateLimit, MediumRateLimit, HighRateLimit } from '../common/decorators/rate-limit.decorator';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard)
  @LowRateLimit() // 5 requests per minute for project creation
  async createProject(
    @Args('input') createProjectInput: CreateProjectInput,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    return this.projectsService.create(createProjectInput, userId);
  }

  @Query(() => [Project])
  @UseGuards(GqlAuthGuard)
  @HighRateLimit() // 100 requests per minute for reading projects
  async projects(@Context() context: any) {
    const userId = context.req.user.id;
    return this.projectsService.findAll(userId);
  }

  @Query(() => Project, { nullable: true })
  @UseGuards(GqlAuthGuard, ProjectMemberGuard)
  @RequireProjectMember()
  @HighRateLimit() // 100 requests per minute for reading individual projects
  async project(@Args('id') projectId: string) {
    return this.projectsService.findOne(projectId);
  }

  @Mutation(() => Project)
  @UseGuards(GqlAuthGuard, ProjectMemberGuard)
  @RequireProjectMember()
  @MediumRateLimit() // 20 requests per minute for adding project members
  async addProjectMember(
    @Args('projectId') projectId: string,
    @Args('userId') userId: string,
  ) {
    return this.projectsService.addMember(projectId, userId);
  }
}
