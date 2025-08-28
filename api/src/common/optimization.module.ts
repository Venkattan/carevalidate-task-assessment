import { Module, Global } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { PerformanceMonitoringService } from './performance/performance-monitoring.service';
import { PerformanceResolver } from './performance/performance.resolver';
import { GraphQLPerformanceInterceptor } from './interceptors/performance.interceptor';
import { DataLoaderService } from './dataloader/dataloader.service';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  providers: [
    // Performance monitoring
    PerformanceMonitoringService,
    PerformanceResolver,
    
    // DataLoader service
    DataLoaderService,
    
    // Global performance interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLPerformanceInterceptor,
    },
    
    // PrismaService with built-in optimizations
    PrismaService,
  ],
  exports: [
    PerformanceMonitoringService,
    DataLoaderService,
    PrismaService,
  ],
})
export class OptimizationModule {}
