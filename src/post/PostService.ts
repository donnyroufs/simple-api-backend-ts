import { inject, injectable } from 'inversify'
import { Mapper } from '@automapper/types'

import { ServiceException } from '@common/ServiceException'
import { CreatePostDto, PostDto, UpdatePostDto } from '@post/dtos'
import { PostEntity } from '@post/PostEntity'
import { PostRepository } from '@post/PostRepository'
import { DITypes } from '@common/types'

@injectable()
export class PostService {
  constructor(
    private readonly _postRepo: PostRepository,
    @inject(DITypes.Mapper) private readonly _mapper: Mapper
  ) {}

  public async find() {
    const posts = await this._postRepo.find()

    return this._mapper.mapArray(posts, PostDto, PostEntity)
  }

  public async findOne(id: PostEntity['id']) {
    const post = await this._postRepo.findOne(id)

    return this._mapper.map(post, PostDto, PostEntity)
  }

  public async create(createPost: CreatePostDto) {
    const post = this._mapper.map(createPost, PostEntity, CreatePostDto)
    const isSaved = await this._postRepo.save(post)

    if (!isSaved) {
      throw new ServiceException('Could not save the entity Post.', __dirname)
    }

    return this._mapper.map(post, PostDto, PostEntity)
  }

  public async updateOne(updatePost: UpdatePostDto) {
    const post = this._mapper.map(updatePost, PostEntity, UpdatePostDto)

    return this._postRepo.updateOne(post)
  }

  public async deleteOne(id: PostEntity['id']) {
    return this._postRepo.deleteOne(id)
  }
}
