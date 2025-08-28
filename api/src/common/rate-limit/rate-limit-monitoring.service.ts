import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

export interface RateLimitEvent {
  userId?: string;
  ip: string;
  endpoint: string;
  timestamp: Date;
  blocked: boolean;
  limit: number;
  ttl: number;
}

@Injectable()
export class RateLimitMonitoringService {
  private readonly logger = new Logger(RateLimitMonitoringService.name);
  private rateLimitEvents: RateLimitEvent[] = [];

  constructor(private prisma: PrismaService) {}

  logRateLimit(event: RateLimitEvent) {
    this.rateLimitEvents.push(event);
    
    if (event.blocked) {
      this.logger.warn(
        `Rate limit exceeded: ${event.endpoint} - User: ${event.userId || 'anonymous'} - IP: ${event.ip}`,
      );
    }

    // Keep only last 1000 events in memory
    if (this.rateLimitEvents.length > 1000) {
      this.rateLimitEvents = this.rateLimitEvents.slice(-1000);
    }
  }

  getRateLimitStats(timeWindow: number = 3600000) { // Default 1 hour
    const now = new Date();
    const windowStart = new Date(now.getTime() - timeWindow);
    
    const recentEvents = this.rateLimitEvents.filter(
      event => event.timestamp >= windowStart
    );

    const totalRequests = recentEvents.length;
    const blockedRequests = recentEvents.filter(event => event.blocked).length;
    const allowedRequests = totalRequests - blockedRequests;

    const topEndpoints = this.getTopEndpoints(recentEvents);
    const topUsers = this.getTopUsers(recentEvents);
    const topIPs = this.getTopIPs(recentEvents);

    return {
      timeWindow: timeWindow / 1000, // in seconds
      totalRequests,
      allowedRequests,
      blockedRequests,
      blockRate: totalRequests > 0 ? (blockedRequests / totalRequests) * 100 : 0,
      topEndpoints,
      topUsers,
      topIPs,
    };
  }

  private getTopEndpoints(events: RateLimitEvent[]) {
    const endpointCounts = events.reduce((acc, event) => {
      const key = event.endpoint;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(endpointCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([endpoint, count]) => ({ endpoint, count }));
  }

  private getTopUsers(events: RateLimitEvent[]) {
    const userCounts = events
      .filter(event => event.userId)
      .reduce((acc, event) => {
        const key = event.userId!;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(userCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([userId, count]) => ({ userId, count }));
  }

  private getTopIPs(events: RateLimitEvent[]) {
    const ipCounts = events.reduce((acc, event) => {
      const key = event.ip;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(ipCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([ip, count]) => ({ ip, count }));
  }

  clearStats() {
    this.rateLimitEvents = [];
  }
}
