import { Injectable, Logger } from '@nestjs/common';

export interface QueryMetrics {
  operationType: 'query' | 'mutation' | 'subscription';
  operationName: string;
  duration: number;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
  userId?: string;
  variables?: any;
}

export interface DatabaseMetrics {
  queryType: string;
  tableName: string;
  duration: number;
  timestamp: Date;
  success: boolean;
  errorMessage?: string;
  rowsAffected?: number;
}

@Injectable()
export class PerformanceMonitoringService {
  private readonly logger = new Logger(PerformanceMonitoringService.name);
  private queryMetrics: QueryMetrics[] = [];
  private dbMetrics: DatabaseMetrics[] = [];
  private readonly maxStoredMetrics = 1000;
  
  // Performance thresholds in milliseconds
  private readonly slowQueryThreshold = 1000;
  private readonly verySlowQueryThreshold = 5000;

  // Track GraphQL operation performance
  trackGraphQLOperation(
    operationType: 'query' | 'mutation' | 'subscription',
    operationName: string,
    startTime: number,
    success: boolean,
    errorMessage?: string,
    userId?: string,
    variables?: any
  ): void {
    const duration = Date.now() - startTime;
    
    const metric: QueryMetrics = {
      operationType,
      operationName,
      duration,
      timestamp: new Date(),
      success,
      errorMessage,
      userId,
      variables: this.sanitizeVariables(variables),
    };

    this.addQueryMetric(metric);
    this.logPerformanceWarnings(metric);
  }

  // Track database query performance
  trackDatabaseQuery(
    queryType: string,
    tableName: string,
    startTime: number,
    success: boolean,
    errorMessage?: string,
    rowsAffected?: number
  ): void {
    const duration = Date.now() - startTime;
    
    const metric: DatabaseMetrics = {
      queryType,
      tableName,
      duration,
      timestamp: new Date(),
      success,
      errorMessage,
      rowsAffected,
    };

    this.addDbMetric(metric);
    this.logDatabaseWarnings(metric);
  }

  // Get performance statistics
  getPerformanceStats(timeRangeMinutes: number = 60): {
    graphql: {
      totalOperations: number;
      averageDuration: number;
      slowQueries: number;
      errorRate: number;
      topSlowOperations: Array<{ operation: string; averageDuration: number; count: number }>;
    };
    database: {
      totalQueries: number;
      averageDuration: number;
      slowQueries: number;
      errorRate: number;
      topSlowTables: Array<{ table: string; averageDuration: number; count: number }>;
    };
  } {
    const cutoffTime = new Date(Date.now() - timeRangeMinutes * 60 * 1000);
    
    const recentGraphQL = this.queryMetrics.filter(m => m.timestamp >= cutoffTime);
    const recentDatabase = this.dbMetrics.filter(m => m.timestamp >= cutoffTime);

    return {
      graphql: this.calculateGraphQLStats(recentGraphQL),
      database: this.calculateDatabaseStats(recentDatabase),
    };
  }

  // Get slow queries for analysis
  getSlowQueries(limitMinutes: number = 60, limit: number = 20): {
    graphql: QueryMetrics[];
    database: DatabaseMetrics[];
  } {
    const cutoffTime = new Date(Date.now() - limitMinutes * 60 * 1000);
    
    const slowGraphQL = this.queryMetrics
      .filter(m => m.timestamp >= cutoffTime && m.duration > this.slowQueryThreshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);

    const slowDatabase = this.dbMetrics
      .filter(m => m.timestamp >= cutoffTime && m.duration > this.slowQueryThreshold)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit);

    return {
      graphql: slowGraphQL,
      database: slowDatabase,
    };
  }

  // Clear old metrics to prevent memory leaks
  clearOldMetrics(olderThanHours: number = 24): void {
    const cutoffTime = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    
    this.queryMetrics = this.queryMetrics.filter(m => m.timestamp >= cutoffTime);
    this.dbMetrics = this.dbMetrics.filter(m => m.timestamp >= cutoffTime);
    
    this.logger.debug(`Cleared metrics older than ${olderThanHours} hours`);
  }

  private addQueryMetric(metric: QueryMetrics): void {
    this.queryMetrics.push(metric);
    
    // Keep only the most recent metrics
    if (this.queryMetrics.length > this.maxStoredMetrics) {
      this.queryMetrics = this.queryMetrics.slice(-this.maxStoredMetrics);
    }
  }

  private addDbMetric(metric: DatabaseMetrics): void {
    this.dbMetrics.push(metric);
    
    // Keep only the most recent metrics
    if (this.dbMetrics.length > this.maxStoredMetrics) {
      this.dbMetrics = this.dbMetrics.slice(-this.maxStoredMetrics);
    }
  }

  private logPerformanceWarnings(metric: QueryMetrics): void {
    if (metric.duration > this.verySlowQueryThreshold) {
      this.logger.warn(
        `Very slow GraphQL ${metric.operationType}: ${metric.operationName} took ${metric.duration}ms`,
        { metric }
      );
    } else if (metric.duration > this.slowQueryThreshold) {
      this.logger.debug(
        `Slow GraphQL ${metric.operationType}: ${metric.operationName} took ${metric.duration}ms`
      );
    }

    if (!metric.success) {
      this.logger.error(
        `Failed GraphQL ${metric.operationType}: ${metric.operationName} - ${metric.errorMessage}`
      );
    }
  }

  private logDatabaseWarnings(metric: DatabaseMetrics): void {
    if (metric.duration > this.verySlowQueryThreshold) {
      this.logger.warn(
        `Very slow database query: ${metric.queryType} on ${metric.tableName} took ${metric.duration}ms`,
        { metric }
      );
    } else if (metric.duration > this.slowQueryThreshold) {
      this.logger.debug(
        `Slow database query: ${metric.queryType} on ${metric.tableName} took ${metric.duration}ms`
      );
    }

    if (!metric.success) {
      this.logger.error(
        `Failed database query: ${metric.queryType} on ${metric.tableName} - ${metric.errorMessage}`
      );
    }
  }

  private calculateGraphQLStats(metrics: QueryMetrics[]) {
    if (metrics.length === 0) {
      return {
        totalOperations: 0,
        averageDuration: 0,
        slowQueries: 0,
        errorRate: 0,
        topSlowOperations: [],
      };
    }

    const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);
    const slowQueries = metrics.filter(m => m.duration > this.slowQueryThreshold).length;
    const errors = metrics.filter(m => !m.success).length;

    // Group by operation name for top slow operations
    const operationGroups = new Map<string, { totalDuration: number; count: number }>();
    
    metrics.forEach(metric => {
      const key = `${metric.operationType}:${metric.operationName}`;
      const existing = operationGroups.get(key) || { totalDuration: 0, count: 0 };
      existing.totalDuration += metric.duration;
      existing.count += 1;
      operationGroups.set(key, existing);
    });

    const topSlowOperations = Array.from(operationGroups.entries())
      .map(([operation, stats]) => ({
        operation,
        averageDuration: stats.totalDuration / stats.count,
        count: stats.count,
      }))
      .sort((a, b) => b.averageDuration - a.averageDuration)
      .slice(0, 10);

    return {
      totalOperations: metrics.length,
      averageDuration: totalDuration / metrics.length,
      slowQueries,
      errorRate: (errors / metrics.length) * 100,
      topSlowOperations,
    };
  }

  private calculateDatabaseStats(metrics: DatabaseMetrics[]) {
    if (metrics.length === 0) {
      return {
        totalQueries: 0,
        averageDuration: 0,
        slowQueries: 0,
        errorRate: 0,
        topSlowTables: [],
      };
    }

    const totalDuration = metrics.reduce((sum, m) => sum + m.duration, 0);
    const slowQueries = metrics.filter(m => m.duration > this.slowQueryThreshold).length;
    const errors = metrics.filter(m => !m.success).length;

    // Group by table for top slow tables
    const tableGroups = new Map<string, { totalDuration: number; count: number }>();
    
    metrics.forEach(metric => {
      const key = `${metric.queryType}:${metric.tableName}`;
      const existing = tableGroups.get(key) || { totalDuration: 0, count: 0 };
      existing.totalDuration += metric.duration;
      existing.count += 1;
      tableGroups.set(key, existing);
    });

    const topSlowTables = Array.from(tableGroups.entries())
      .map(([table, stats]) => ({
        table,
        averageDuration: stats.totalDuration / stats.count,
        count: stats.count,
      }))
      .sort((a, b) => b.averageDuration - a.averageDuration)
      .slice(0, 10);

    return {
      totalQueries: metrics.length,
      averageDuration: totalDuration / metrics.length,
      slowQueries,
      errorRate: (errors / metrics.length) * 100,
      topSlowTables,
    };
  }

  private sanitizeVariables(variables: any): any {
    if (!variables) return undefined;
    
    // Remove sensitive data like passwords
    const sanitized = { ...variables };
    if (sanitized.password) sanitized.password = '[REDACTED]';
    if (sanitized.token) sanitized.token = '[REDACTED]';
    
    return sanitized;
  }
}
