import { InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends User {
  @Field()
  name: string;
  @Field()
  email: string;
}
