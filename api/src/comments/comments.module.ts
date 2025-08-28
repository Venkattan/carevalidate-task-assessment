import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsResolver } from './comments.resolver';
import { CommentFieldResolver } from './comment-field.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { TasksModule } from '../tasks/tasks.module';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { DataLoaderModule } from '../common/dataloader/dataloader.module';

@Module({
  imports: [TasksModule, ProjectsModule, AuthModule, DataLoaderModule],
  providers: [CommentsService, CommentsResolver, CommentFieldResolver, PrismaService],
})
export class CommentsModule {}
