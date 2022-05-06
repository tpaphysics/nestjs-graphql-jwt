import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  exports: [UsersService],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
