import { injectable } from 'inversify'

import { ServiceException } from '@common/ServiceException'
import { mapper } from '@common/Mapper'
import { CreatePostDto, PostDto, UpdatePostDto } from '@post/dtos'
import { PostEntity } from '@post/PostEntity'
import { PostRepository } from '@post/PostRepository'

@injectable()
export class PostService {
  constructor(private readonly _postRepo: PostRepository) {}

  public async find() {
    const posts = await this._postRepo.find()

    return mapper.mapArray(posts, PostDto, PostEntity)
  }

  public async findOne(id: PostEntity['id']) {
    const post = await this._postRepo.findOne(id)

    return mapper.map(post, PostDto, PostEntity)
  }

  public async create(createPost: CreatePostDto) {
    const post = mapper.map(createPost, PostEntity, CreatePostDto)
    const isSaved = await this._postRepo.save(post)

    if (!isSaved) {
      throw new ServiceException('Could not save the entity Post.', __dirname)
    }

    return mapper.map(post, PostDto, PostEntity)
  }

  public async updateOne(updatePost: UpdatePostDto) {
    const post = mapper.map(updatePost, PostEntity, UpdatePostDto)

    return this._postRepo.updateOne(post)
  }

  public async deleteOne(id: PostEntity['id']) {
    return this._postRepo.deleteOne(id)
  }
}
