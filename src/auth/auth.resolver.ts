import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth-input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth, { name: 'authenticate' })
  createAuth(@Args('authInput') authInput: AuthInput): Promise<Auth> {
    return this.authService.create(authInput);
  }
}
