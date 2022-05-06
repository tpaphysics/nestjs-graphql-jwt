import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthInput } from './dto/auth-input';
import { PayloadJwt } from './dto/payload-jwt';
import { AuthResponse } from './entities/auth-entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly UserService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
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
    return this.login(user);
  }
  private async login(user: User): Promise<AuthResponse> {
    const { id: sub, email, name } = user;
    const payload: PayloadJwt = {
      sub,
      email,
      name,
    };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
