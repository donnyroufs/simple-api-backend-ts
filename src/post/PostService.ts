import { inject, injectable } from 'inversify'
import { Mapper } from '@automapper/types'
import { Result, Ok, Err } from 'ts-results'

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

  public async findOne(id: PostEntity['id']): Promise<Result<PostDto, string>> {
    const post = await this._postRepo.findOne(id)

    if (!post) {
      return Err('Post does not exist')
    }

    return Ok(this._mapper.map(post, PostDto, PostEntity))
  }

  public async create(
    createPost: CreatePostDto
  ): Promise<Result<PostDto, string>> {
    const post = this._mapper.map(createPost, PostEntity, CreatePostDto)

    const isSaved = await this._postRepo.save(post)

    if (!isSaved) {
      return Err('Could not save entity Post')
    }

    return Ok(this._mapper.map(post, PostDto, PostEntity))
  }

  public async updateOne(
    updatePost: UpdatePostDto
  ): Promise<Result<boolean, string>> {
    const post = this._mapper.map(updatePost, PostEntity, UpdatePostDto)

    const isUpdated = await this._postRepo.updateOne(post)

    if (!isUpdated) {
      return Err('Could not update Post')
    }

    return Ok(isUpdated)
  }

  public async deleteOne(
    id: PostEntity['id']
  ): Promise<Result<boolean, string>> {
    const isDeleted = await this._postRepo.deleteOne(id)

    if (!isDeleted) {
      return Err('Could not delete Post')
    }

    return Ok(isDeleted)
  }
}
