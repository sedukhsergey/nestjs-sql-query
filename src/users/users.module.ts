import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import UsersService from './users.service';
import UsersRepository from './users.repository';

@Module({
  imports: [],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
