import { SetMetadata } from '@nestjs/common';
import { Throttle as ThrottlerThrottle, SkipThrottle as ThrottlerSkip } from '@nestjs/throttler';

export const THROTTLER_SKIP = 'throttler_skip';
export const THROTTLER_LIMIT = 'throttler_limit';

// Skip rate limiting entirely
export const SkipThrottle = () => ThrottlerSkip();

// Custom rate limiting for specific operations
export const Throttle = (limit: number, ttl: number) => 
  ThrottlerThrottle({ default: { limit, ttl } });

// Predefined rate limits for common operations
export const LowRateLimit = () => Throttle(5, 60000); // 5 requests per minute
export const MediumRateLimit = () => Throttle(20, 60000); // 20 requests per minute  
export const HighRateLimit = () => Throttle(100, 60000); // 100 requests per minute

// Auth-specific rate limits
export const AuthRateLimit = () => Throttle(10, 900000); // 10 requests per 15 minutes
export const LoginRateLimit = () => Throttle(5, 900000); // 5 login attempts per 15 minutes
