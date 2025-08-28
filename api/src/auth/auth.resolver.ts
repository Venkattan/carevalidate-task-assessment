import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { RegisterInput, LoginInput } from './dto/auth.input';
import { AuthPayload, User } from './dto/auth.type';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { UsersService } from '../users/users.service';
import { LoginRateLimit, AuthRateLimit } from '../common/decorators/rate-limit.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => AuthPayload)
  @AuthRateLimit() // 10 requests per 15 minutes
  async register(@Args('input') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthPayload)
  @LoginRateLimit() // 5 login attempts per 15 minutes
  async login(@Args('input') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => User, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Throttle({ default: { limit: 60, ttl: 60000 } }) // 60 requests per minute for authenticated users
  async me(@Context() context: any) {
    const userId = context.req.user.id;
    return this.usersService.findById(userId);
  }
}
