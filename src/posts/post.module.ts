import PostsController from './posts.controller';
import { PostsService } from './posts.service';
import PostsRepository from './posts.repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
