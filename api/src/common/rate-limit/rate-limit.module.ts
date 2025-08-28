import { Module } from '@nestjs/common';
import { RateLimitMonitoringService } from './rate-limit-monitoring.service';
import { RateLimitResolver } from './rate-limit.resolver';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RateLimitMonitoringService, RateLimitResolver],
  exports: [RateLimitMonitoringService],
})
export class RateLimitModule {}
