import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dto/auth-input';
import { AuthResponse } from './entities/auth-entity';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UsersService) {}
  async validateUser(authInput: AuthInput): Promise<AuthResponse> {
    const { email, password } = authInput;
    const user = await this.UserService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User or password invalid!');
    }

    const isValidPassword = compareSync(password, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('User or password invalid!');
    }
    return {
      user,
      access_token: 'token',
    };
  }
}
