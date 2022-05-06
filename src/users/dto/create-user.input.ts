import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, Matches } from 'class-validator';
import { User } from '../entities/user.entity';

@InputType()
export class CreateUserInput extends User {
  @Field(() => String)
  @IsString()
  //@Matches(/[a-zA-Z0-9_-]{2,20}/)
  name: string;

  @Field(() => String)
  @IsString()
  //@IsEmail(() => String)
  email: string;

  @Field(() => String)
  @IsString()
  password: string;
}
