import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class AuthInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
