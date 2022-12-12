import { Module } from '@nestjs/common';
import { PostPersistenceService } from './post-persistence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostPersistenceService],
  exports: [PostPersistenceService],
})
export class PostPersistenceModule {}
