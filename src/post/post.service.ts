import { Service } from 'typedi'

import { mapper, ServiceException } from '@common/index'
import { CreatePostDto, PostEntity, PostRepository } from '@post/index'
import { PostDto } from './dtos'

@Service()
export class PostService {
  constructor(private readonly _postRepo: PostRepository) {}
  public async create(createPost: CreatePostDto) {
    const entity = mapper.map(createPost, PostEntity, CreatePostDto)
    const isSaved = await this._postRepo.save(entity)

    if (!isSaved) {
      throw new ServiceException('Could not save the entity Post.', __dirname)
    }

    return mapper.map(entity, PostDto, PostEntity)
  }
}
