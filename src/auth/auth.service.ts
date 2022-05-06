import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dto/auth-input';
import { Auth } from './entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly UserService: UsersService) {}
  async create(authInput: AuthInput): Promise<any> {
    const { email, password } = authInput;
    const existUser = await this.UserService.findByEmail(email);
    if (existUser) {
      throw new UnauthorizedException('User or password invalid!');
    }

    return;
  }
}
