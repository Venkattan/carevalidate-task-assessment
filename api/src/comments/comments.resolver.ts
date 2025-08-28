import { Resolver, Mutation, Args, Context, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { CommentsService } from './comments.service';
import { TasksService } from '../tasks/tasks.service';
import { ProjectsService } from '../projects/projects.service';
import { TaskComment } from '../tasks/dto/task.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CommentAccessGuard } from '../auth/guards/comment-access.guard';

const pubSub = new PubSub();

@Resolver(() => TaskComment)
export class CommentsResolver {
  constructor(
    private commentsService: CommentsService,
    private tasksService: TasksService,
    private projectsService: ProjectsService,
  ) {}

  @Mutation(() => TaskComment)
  @UseGuards(GqlAuthGuard, CommentAccessGuard)
  async addComment(
    @Args('taskId') taskId: string,
    @Args('content') content: string,
    @Context() context: any,
  ) {
    const userId = context.req.user.id;
    const comment = await this.commentsService.create(taskId, content, userId);
    
    // Publish comment added event
    pubSub.publish('commentAdded', {
      commentAdded: comment,
      taskId,
    });

    return comment;
  }

  @Subscription(() => TaskComment, {
    filter: (payload, variables) => {
      return payload.taskId === variables.taskId;
    },
  })
  commentAdded(@Args('taskId') taskId: string) {
    return pubSub.asyncIterableIterator('commentAdded');
  }
}
