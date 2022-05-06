import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth-input';
import { AuthResponse } from './entities/auth-entity';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'authenticate' })
  createAuth(@Args('authInput') authInput: AuthInput): Promise<any> {
    return this.authService.validateUser(authInput);
  }
}
