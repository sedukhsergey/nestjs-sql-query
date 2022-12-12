import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PostEntity from './entities/post.entity';

@Injectable()
export class PostPersistenceService {
  constructor(
    @InjectRepository(PostEntity)
    private postEntityRepository: Repository<PostEntity>,
  ) {}

  async createPost(title, content) {
    const newPost = this.postEntityRepository.create({ title, content });
    await this.postEntityRepository.save(newPost);
    return newPost;
  }
}
