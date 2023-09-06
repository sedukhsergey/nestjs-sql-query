import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import FindOneParams from '../utils/findOneParams';
import PostDto from './post.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('posts')
export default class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  getPosts() {
    return this.postsService.getPosts();
  }

  @Get(':id')
  getPostById(@Param() { id }: FindOneParams) {
    return this.postsService.getPostById(id);
  }

  @Put(':id')
  updatePost(@Param() { id }: FindOneParams, @Body() postData: PostDto) {
    return this.postsService.updatePost(id, postData);
  }

  @Post()
  createPost(@Body() postData: PostDto) {
    return this.postsService.createPost(postData);
  }

  @Delete(':id')
  deletePost(@Param() { id }: FindOneParams) {
    return this.postsService.deletePost(id);
  }
}
