import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class GqlThrottlerGuard extends ThrottlerGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Skip throttling for WebSocket subscriptions entirely to fix header errors
    const gqlCtx = GqlExecutionContext.create(context);
    const info = gqlCtx.getInfo();
    
    // Check if this is a subscription operation - updated to fix duplicates
    if (info && info.operation && info.operation.operation === 'subscription') {
      return true;
    }
    
    return super.canActivate(context);
  }

  getRequestResponse(context: ExecutionContext) {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx = gqlCtx.getContext();
    
    // Handle both HTTP and WebSocket contexts
    const req = ctx.req || ctx.connection?.context?.req || {};
    let res = ctx.res || ctx.connection?.context?.res || {};
    
    // For WebSocket connections, create a mock response object with required methods
    if (!res || typeof res.header !== 'function') {
      res = {
        header: () => {},
        setHeader: () => {},
        getHeader: () => undefined,
        removeHeader: () => {},
        ...res
      };
    }
    
    // Add missing properties if they don't exist
    if (!req.headers) {
      req.headers = {};
    }
    if (!req.ip) {
      req.ip = req.connection?.remoteAddress || req.socket?.remoteAddress || '127.0.0.1';
    }
    
    return { req, res };
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
