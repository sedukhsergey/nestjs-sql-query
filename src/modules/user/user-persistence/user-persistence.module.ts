import { Module } from '@nestjs/common';
import { UserPersistenceService } from './user-persistence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import UserEntity from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserPersistenceService],
  exports: [UserPersistenceService],
})
export class UserPersistenceModule {}
