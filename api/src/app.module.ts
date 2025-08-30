import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { PrismaModule } from './prisma/prisma.module';
import { DataLoaderModule } from './common/dataloader/dataloader.module';
import { OptimizationModule } from './common/optimization.module';
import { RateLimitModule } from './common/rate-limit/rate-limit.module';
import { DataLoaderService } from './common/dataloader/dataloader.service';
import { GqlThrottlerGuard } from './common/guards/graphql-throttler.guard';

@Module({
  imports: [
    // Rate limiting configuration
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000, // 1 second
        limit: 10, // 10 requests per second
      },
      {
        name: 'medium',
        ttl: 10000, // 10 seconds
        limit: 50, // 50 requests per 10 seconds
      },
      {
        name: 'long',
        ttl: 60000, // 1 minute
        limit: 200, // 200 requests per minute
      },
    ]),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [DataLoaderModule],
      inject: [DataLoaderService],
      useFactory: (dataLoaderService: DataLoaderService) => ({
        autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
        playground: process.env.NODE_ENV === 'development',
        introspection: true,
        subscriptions: {
          'graphql-ws': true,
          'subscriptions-transport-ws': true,
        },
        context: ({ req, res, connection }) => {
          const baseContext = {
            dataLoaders: dataLoaderService,
          };

          if (connection) {
            // WebSocket context for subscriptions
            return { 
              ...baseContext,
              req: connection.context.req || connection.context,
              res,
            };
          }
          
          // HTTP context for queries and mutations
          return {
            ...baseContext,
            req,
            res,
          };
        },
      }),
    }),
    PrismaModule,
    DataLoaderModule,
    OptimizationModule, // Add the optimization module
    RateLimitModule, // Add the rate limit module
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
