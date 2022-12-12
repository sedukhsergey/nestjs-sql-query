import { Injectable } from "@nestjs/common";
import { PostPersistenceService } from './post-persistence/post-persistence.service';

@Injectable()
export class PostService {
  constructor(
    private readonly postPersistenceService: PostPersistenceService,
  ) {}

  async createPost(title, content) {
    try {
      return this.postPersistenceService.createPost(title, content);
    } catch (err) {
      console.log('err', err);
    }
  }
}
