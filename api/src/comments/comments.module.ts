import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { TasksModule } from '../tasks/tasks.module';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule],
  providers: [CommentsService, CommentsResolver, PrismaService],
})
export class CommentsModule {}
