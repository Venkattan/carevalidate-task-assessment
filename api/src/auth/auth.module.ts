import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { ProjectMemberGuard } from './guards/project-member.guard';
import { TaskAccessGuard } from './guards/task-access.guard';
import { CommentAccessGuard } from './guards/comment-access.guard';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback-secret',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
    }),
    UsersModule,
  ],
  providers: [
    AuthService, 
    AuthResolver, 
    JwtStrategy, 
    ProjectMemberGuard, 
    TaskAccessGuard,
    CommentAccessGuard,
    PrismaService
  ],
  exports: [AuthService, ProjectMemberGuard, TaskAccessGuard, CommentAccessGuard],
})
export class AuthModule {}
