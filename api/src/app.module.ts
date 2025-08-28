import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
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
import { DataLoaderService } from './common/dataloader/dataloader.service';

@Module({
  imports: [
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
        context: ({ req, connection }) => {
          const baseContext = {
            req: connection ? connection.context : req,
            dataLoaders: dataLoaderService,
          };

          if (connection) {
            // WebSocket context for subscriptions
            return { 
              ...baseContext,
              req: connection.context,
            };
          }
          
          // HTTP context for queries and mutations
          return baseContext;
        },
      }),
    }),
    PrismaModule,
    DataLoaderModule,
    OptimizationModule, // Add the optimization module
    AuthModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
