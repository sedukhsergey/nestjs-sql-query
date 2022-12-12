import { Module } from '@nestjs/common';
import { PostPersistenceModule } from './post-persistence/post-persistence.module';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [PostPersistenceModule],
  providers: [PostService],
  exports: [PostService],
  controllers: [PostController],
})
export class PostModule {}
