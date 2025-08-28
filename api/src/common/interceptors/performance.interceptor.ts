import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { PerformanceMonitoringService } from '../performance/performance-monitoring.service';

@Injectable()
export class GraphQLPerformanceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(GraphQLPerformanceInterceptor.name);

  constructor(private performanceService: PerformanceMonitoringService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const gqlContext = GqlExecutionContext.create(context);
    const info = gqlContext.getInfo();
    const args = gqlContext.getArgs();
    const ctx = gqlContext.getContext();
    
    if (!info) {
      // Not a GraphQL request, skip tracking
      return next.handle();
    }

    const operationType = info.operation.operation as 'query' | 'mutation' | 'subscription';
    const operationName = info.fieldName;
    const userId = ctx.req?.user?.id;
    const startTime = Date.now();

    this.logger.debug(`GraphQL ${operationType} started: ${operationName}`);

    return next.handle().pipe(
      tap((result) => {
        // Success case
        this.performanceService.trackGraphQLOperation(
          operationType,
          operationName,
          startTime,
          true,
          undefined,
          userId,
          args
        );
        
        const duration = Date.now() - startTime;
        this.logger.debug(`GraphQL ${operationType} completed: ${operationName} in ${duration}ms`);
      }),
      catchError((error) => {
        // Error case
        this.performanceService.trackGraphQLOperation(
          operationType,
          operationName,
          startTime,
          false,
          error.message,
          userId,
          args
        );
        
        const duration = Date.now() - startTime;
        this.logger.error(
          `GraphQL ${operationType} failed: ${operationName} in ${duration}ms - ${error.message}`
        );
        
        return throwError(error);
      })
    );
  }
}
