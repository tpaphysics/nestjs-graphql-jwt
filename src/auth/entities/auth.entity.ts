import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';

@ObjectType()
export class Auth {
  @Field(() => User)
  user: User;

  @Field(() => String)
  access_token: string;
}
