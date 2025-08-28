import { INestApplication, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    await this.$connect();
    // Comment out middleware for now due to compatibility issues
    // this.setupQueryLogging();
  }

  async enableShutdownHooks(app: INestApplication) {
    await app.close();
  }

  private setupQueryLogging() {
    // Use Prisma middleware to track query performance
    (this as any).$use(async (params: any, next: any) => {
      const startTime = Date.now();
      const queryInfo = `${params.action} on ${params.model}`;
      
      try {
        const result = await next(params);
        
        const duration = Date.now() - startTime;
        if (duration > 500) { // Log slow queries
          this.logger.warn(`Slow query: ${queryInfo} took ${duration}ms`);
        } else if (duration > 100) {
          this.logger.debug(`Query: ${queryInfo} took ${duration}ms`);
        }
        
        return result;
      } catch (error: any) {
        const duration = Date.now() - startTime;
        this.logger.error(`Failed query: ${queryInfo} took ${duration}ms - ${error.message}`);
        throw error;
      }
    });
  }

  // Helper method to get rows affected
  private getRowsAffected(action: string, result: any): number | undefined {
    if (!result) return 0;
    
    switch (action) {
      case 'findMany':
        return Array.isArray(result) ? result.length : 0;
      case 'create':
      case 'update':
      case 'delete':
      case 'upsert':
        return 1;
      case 'createMany':
      case 'updateMany':
      case 'deleteMany':
        return result.count || 0;
      default:
        return undefined;
    }
  }

  // Optimized query methods with better defaults
  async findManyOptimized<T>(
    model: any,
    args: any,
    defaultSelect?: any
  ): Promise<T[]> {
    const startTime = Date.now();
    
    // Apply default select if not specified and available
    if (!args.include && !args.select && defaultSelect) {
      args.select = defaultSelect;
    }
    
    // Add reasonable limit if not specified
    if (!args.take && !args.skip) {
      args.take = 50; // Default limit to prevent huge queries
    }
    
    const result = await model.findMany(args);
    
    this.logger.debug(`Optimized findMany took ${Date.now() - startTime}ms, returned ${result.length} records`);
    
    return result;
  }

  // Simple cache implementation for count queries
  private cache = new Map<string, { value: number; expiry: number }>();

  async countWithCache<T>(
    model: any,
    where: any,
    cacheKey?: string,
    cacheTTL: number = 60000 // 1 minute default
  ): Promise<number> {
    // Simple in-memory cache for count queries
    // In production, you'd use Redis or similar
    const key = cacheKey || `count_${JSON.stringify(where)}`;
    
    // Check cache first
    const cached = this.getCachedCount(key);
    if (cached !== null) {
      return cached;
    }
    
    const startTime = Date.now();
    const count = await model.count({ where });
    
    this.logger.debug(`Count query took ${Date.now() - startTime}ms`);
    
    // Cache the result
    this.setCachedCount(key, count, cacheTTL);
    
    return count;
  }

  private getCachedCount(key: string): number | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() > cached.expiry) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.value;
  }

  private setCachedCount(key: string, value: number, ttl: number): void {
    this.cache.set(key, {
      value,
      expiry: Date.now() + ttl
    });
    
    // Clean up expired entries periodically
    if (this.cache.size > 1000) {
      this.cleanupCache();
    }
  }

  private cleanupCache(): void {
    const now = Date.now();
    for (const [key, cached] of this.cache.entries()) {
      if (now > cached.expiry) {
        this.cache.delete(key);
      }
    }
  }
}
