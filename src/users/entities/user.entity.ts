import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';

@ObjectType()
export class User implements Prisma.UserUncheckedCreateInput {
  @Field(() => Int)
  id?: number;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;
}
