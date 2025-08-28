import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksResolver } from './tasks.resolver';
import { TaskFieldResolver } from './task-field.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { ProjectsModule } from '../projects/projects.module';
import { AuthModule } from '../auth/auth.module';
import { DataLoaderModule } from '../common/dataloader/dataloader.module';

@Module({
  imports: [ProjectsModule, AuthModule, DataLoaderModule],
  providers: [TasksService, TasksResolver, TaskFieldResolver, PrismaService],
  exports: [TasksService],
})
export class TasksModule {}
