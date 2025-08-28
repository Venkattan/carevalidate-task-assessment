import { Resolver, ResolveField, Parent, Context } from '@nestjs/graphql';
import { TaskComment } from '../tasks/dto/task.dto';
import { User } from '../auth/dto/auth.type';
import { DataLoaderService } from '../common/dataloader/dataloader.service';

@Resolver(() => TaskComment)
export class CommentFieldResolver {
  constructor(private dataLoaderService: DataLoaderService) {}

  @ResolveField(() => User)
  async author(@Parent() comment: TaskComment, @Context() context: any): Promise<User> {
    const dataLoader = context.dataLoaders || this.dataLoaderService;
    return dataLoader.userLoader.load(comment.author?.id || (comment as any).authorId);
  }
}
