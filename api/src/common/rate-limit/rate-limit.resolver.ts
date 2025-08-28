import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { RateLimitMonitoringService } from './rate-limit-monitoring.service';
import { HighRateLimit } from '../decorators/rate-limit.decorator';

@ObjectType()
export class RateLimitEndpointStats {
  @Field()
  endpoint: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class RateLimitUserStats {
  @Field()
  userId: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class RateLimitIPStats {
  @Field()
  ip: string;

  @Field(() => Int)
  count: number;
}

@ObjectType()
export class RateLimitStats {
  @Field(() => Int)
  timeWindow: number; // in seconds

  @Field(() => Int)
  totalRequests: number;

  @Field(() => Int)
  allowedRequests: number;

  @Field(() => Int)
  blockedRequests: number;

  @Field(() => Float)
  blockRate: number; // percentage

  @Field(() => [RateLimitEndpointStats])
  topEndpoints: RateLimitEndpointStats[];

  @Field(() => [RateLimitUserStats])
  topUsers: RateLimitUserStats[];

  @Field(() => [RateLimitIPStats])
  topIPs: RateLimitIPStats[];
}

@Resolver()
export class RateLimitResolver {
  constructor(private rateLimitMonitoringService: RateLimitMonitoringService) {}

  @Query(() => RateLimitStats)
  @UseGuards(GqlAuthGuard)
  @HighRateLimit() // 100 requests per minute for monitoring stats
  async rateLimitStats(
    @Args('timeWindow', { defaultValue: 3600 }) timeWindow: number, // seconds
  ): Promise<RateLimitStats> {
    const timeWindowMs = timeWindow * 1000; // convert to milliseconds
    return this.rateLimitMonitoringService.getRateLimitStats(timeWindowMs);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  @HighRateLimit()
  async clearRateLimitStats(): Promise<boolean> {
    this.rateLimitMonitoringService.clearStats();
    return true;
  }
}
