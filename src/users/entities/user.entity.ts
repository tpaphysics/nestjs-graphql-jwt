import { ObjectType, Field, Int, ID, HideField } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@ObjectType()
export class User implements Prisma.UserUncheckedCreateInput {
  @Field(() => ID)
  id?: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  @HideField()
  password: string;
}
