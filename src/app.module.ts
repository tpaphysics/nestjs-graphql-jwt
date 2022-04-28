import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule],
})
export class AppModule {}
