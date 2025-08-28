/**
 * Rate Limiting Configuration
 * 
 * This file defines the rate limiting rules for the Task Management API.
 * Different endpoints have different limits based on their impact and usage patterns.
 */

export const RATE_LIMIT_CONFIG = {
  // Global default limits (applied if no specific limit is set)
  global: {
    short: { ttl: 1000, limit: 10 },    // 10 requests per second
    medium: { ttl: 10000, limit: 50 },  // 50 requests per 10 seconds  
    long: { ttl: 60000, limit: 200 },   // 200 requests per minute
  },

  // Authentication endpoints (stricter limits)
  auth: {
    login: { ttl: 900000, limit: 5 },     // 5 login attempts per 15 minutes
    register: { ttl: 900000, limit: 10 }, // 10 registrations per 15 minutes
    profile: { ttl: 60000, limit: 60 },   // 60 profile requests per minute
  },

  // CRUD operations (balanced limits)
  crud: {
    create: { ttl: 60000, limit: 20 },    // 20 creates per minute
    read: { ttl: 60000, limit: 100 },     // 100 reads per minute
    update: { ttl: 60000, limit: 20 },    // 20 updates per minute
    delete: { ttl: 60000, limit: 5 },     // 5 deletes per minute (more restrictive)
  },

  // Project operations
  projects: {
    create: { ttl: 60000, limit: 5 },     // 5 project creations per minute
    read: { ttl: 60000, limit: 100 },     // 100 project reads per minute
    addMember: { ttl: 60000, limit: 20 }, // 20 member additions per minute
  },

  // Task operations
  tasks: {
    create: { ttl: 60000, limit: 20 },    // 20 task creations per minute
    read: { ttl: 60000, limit: 100 },     // 100 task reads per minute
    update: { ttl: 60000, limit: 20 },    // 20 task updates per minute
    delete: { ttl: 60000, limit: 5 },     // 5 task deletions per minute
    assign: { ttl: 60000, limit: 20 },    // 20 task assignments per minute
  },

  // Comment operations
  comments: {
    create: { ttl: 60000, limit: 20 },    // 20 comments per minute
  },

  // Monitoring and analytics (higher limits for admins)
  monitoring: {
    stats: { ttl: 60000, limit: 100 },    // 100 stats requests per minute
  },
};

export const RATE_LIMIT_MESSAGES = {
  GENERAL: 'Rate limit exceeded. Please try again later.',
  LOGIN: 'Too many login attempts. Please try again in 15 minutes.',
  REGISTER: 'Too many registration attempts. Please try again in 15 minutes.',
  CREATE: 'Too many creation requests. Please slow down.',
  DELETE: 'Too many deletion requests. Please be careful.',
};
