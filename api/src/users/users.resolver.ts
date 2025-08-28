import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../auth/dto/auth.type';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(GqlAuthGuard)
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async user(@Args('id') id: string) {
    return this.usersService.findById(id);
  }
}
