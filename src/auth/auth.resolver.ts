import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IsPublicRoute } from './decorators/is-public-route.decorator';
import { AuthInput } from './dto/auth-input';
import { AuthResponse } from './entities/auth-entity';
import { GqlAuthGuard } from './gards/auth.guard';

@IsPublicRoute()
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}
  @Mutation(() => AuthResponse, { name: 'authenticate' })
  createAuth(@Args('authInput') authInput: AuthInput): Promise<any> {
    return this.authService.validateUser(authInput);
  }
}
