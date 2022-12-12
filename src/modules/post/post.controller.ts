import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  async createPost(@Body() createPostDto) {
    return this.postService.createPost(
      createPostDto.title,
      createPostDto.content,
    );
  }
}
