import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../auth/guards/gql-auth.guard';
import { PerformanceMonitoringService } from '../performance/performance-monitoring.service';

// GraphQL types for performance data
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class GraphQLPerformanceStats {
  @Field(() => Int)
  totalOperations: number;

  @Field(() => Number)
  averageDuration: number;

  @Field(() => Int)
  slowQueries: number;

  @Field(() => Number)
  errorRate: number;

  @Field(() => [SlowOperation])
  topSlowOperations: SlowOperation[];
}

@ObjectType()
class DatabasePerformanceStats {
  @Field(() => Int)
  totalQueries: number;

  @Field(() => Number)
  averageDuration: number;

  @Field(() => Int)
  slowQueries: number;

  @Field(() => Number)
  errorRate: number;

  @Field(() => [SlowTable])
  topSlowTables: SlowTable[];
}

@ObjectType()
class SlowOperation {
  @Field()
  operation: string;

  @Field(() => Number)
  averageDuration: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
class SlowTable {
  @Field()
  table: string;

  @Field(() => Number)
  averageDuration: number;

  @Field(() => Int)
  count: number;
}

@ObjectType()
class PerformanceOverview {
  @Field(() => GraphQLPerformanceStats)
  graphql: GraphQLPerformanceStats;

  @Field(() => DatabasePerformanceStats)
  database: DatabasePerformanceStats;
}

@ObjectType()
class SlowQuery {
  @Field()
  operationType: string;

  @Field()
  operationName: string;

  @Field(() => Number)
  duration: number;

  @Field()
  timestamp: Date;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field({ nullable: true })
  userId?: string;
}

@ObjectType()
class SlowDatabaseQuery {
  @Field()
  queryType: string;

  @Field()
  tableName: string;

  @Field(() => Number)
  duration: number;

  @Field()
  timestamp: Date;

  @Field()
  success: boolean;

  @Field({ nullable: true })
  errorMessage?: string;

  @Field(() => Int, { nullable: true })
  rowsAffected?: number;
}

@ObjectType()
class SlowQueriesResponse {
  @Field(() => [SlowQuery])
  graphql: SlowQuery[];

  @Field(() => [SlowDatabaseQuery])
  database: SlowDatabaseQuery[];
}

@Resolver()
export class PerformanceResolver {
  constructor(private performanceService: PerformanceMonitoringService) {}

  @Query(() => PerformanceOverview, { 
    description: 'Get performance statistics for GraphQL operations and database queries' 
  })
  @UseGuards(GqlAuthGuard)
  async performanceStats(
    @Args('timeRangeMinutes', { type: () => Int, defaultValue: 60, description: 'Time range in minutes to analyze' }) 
    timeRangeMinutes: number
  ): Promise<PerformanceOverview> {
    const stats = this.performanceService.getPerformanceStats(timeRangeMinutes);
    
    return {
      graphql: {
        totalOperations: stats.graphql.totalOperations,
        averageDuration: stats.graphql.averageDuration,
        slowQueries: stats.graphql.slowQueries,
        errorRate: stats.graphql.errorRate,
        topSlowOperations: stats.graphql.topSlowOperations,
      },
      database: {
        totalQueries: stats.database.totalQueries,
        averageDuration: stats.database.averageDuration,
        slowQueries: stats.database.slowQueries,
        errorRate: stats.database.errorRate,
        topSlowTables: stats.database.topSlowTables,
      },
    };
  }

  @Query(() => SlowQueriesResponse, { 
    description: 'Get the slowest queries for analysis and optimization' 
  })
  @UseGuards(GqlAuthGuard)
  async slowQueries(
    @Args('limitMinutes', { type: () => Int, defaultValue: 60, description: 'Time range in minutes to analyze' }) 
    limitMinutes: number,
    @Args('limit', { type: () => Int, defaultValue: 20, description: 'Maximum number of slow queries to return' }) 
    limit: number
  ): Promise<SlowQueriesResponse> {
    const slowQueries = this.performanceService.getSlowQueries(limitMinutes, limit);
    
    return {
      graphql: slowQueries.graphql.map(query => ({
        operationType: query.operationType,
        operationName: query.operationName,
        duration: query.duration,
        timestamp: query.timestamp,
        success: query.success,
        errorMessage: query.errorMessage,
        userId: query.userId,
      })),
      database: slowQueries.database.map(query => ({
        queryType: query.queryType,
        tableName: query.tableName,
        duration: query.duration,
        timestamp: query.timestamp,
        success: query.success,
        errorMessage: query.errorMessage,
        rowsAffected: query.rowsAffected,
      })),
    };
  }
}
