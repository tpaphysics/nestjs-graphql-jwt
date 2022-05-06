import { User } from 'src/users/entities/user.entity';

export class AuthRequest extends Request {
  user: User;
}
