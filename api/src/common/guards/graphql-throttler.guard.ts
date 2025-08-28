import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    return { req: ctx.req, res: ctx.res };
  }

  async getTracker(req: any): Promise<string> {
    // Use user ID if authenticated, otherwise fall back to IP
    const user = req.user;
    if (user && user.id) {
      return `user-${user.id}`;
    }
    return req.ip || req.connection?.remoteAddress || 'unknown';
  }

  protected async getErrorMessage(
    context: ExecutionContext,
    throttlerLimitDetail: any,
  ): Promise<string> {
    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo();
    const operationName = info.operation.operation;
    const fieldName = info.fieldName;
    
    return `Rate limit exceeded for ${operationName} operation "${fieldName}". Try again in ${Math.ceil(
      throttlerLimitDetail.timeToExpire / 1000,
    )} seconds.`;
  }
}
