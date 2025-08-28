import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsResolver } from './projects.resolver';
import { ProjectFieldResolver } from './project-field.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { DataLoaderModule } from '../common/dataloader/dataloader.module';

@Module({
  imports: [AuthModule, DataLoaderModule],
  providers: [ProjectsService, ProjectsResolver, ProjectFieldResolver, PrismaService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
