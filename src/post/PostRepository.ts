import { injectable } from 'inversify'

import { DbContext } from '@common/DbContext'
import { IRepository } from '@common/interfaces'
import { UpdateEntity } from '@common/types/index'
import { PostEntity } from '@post/PostEntity'

@injectable()
export class PostRepository implements IRepository<PostEntity> {
  constructor(private readonly _dbContext: DbContext) {}

  public async find() {
    return this._dbContext.post.findMany()
  }

  public async findOne(id: string) {
    return this._dbContext.post.findFirst({
      where: {
        id,
      },
    })
  }

  public async save(entity: PostEntity) {
    const createdEntity = await this._dbContext.post.create({
      data: entity,
    })

    return !!createdEntity
  }

  public async updateOne(
    partialEntity: UpdateEntity<PostEntity>
  ): Promise<boolean> {
    const updatedPost = await this._dbContext.post.update({
      where: {
        id: partialEntity.id,
      },
      data: {
        ...partialEntity,
      },
    })

    return !!updatedPost
  }

  public async deleteOne(id: PostEntity['id']): Promise<boolean> {
    const deletedPost = await this._dbContext.post.delete({
      where: {
        id,
      },
    })

    return !!deletedPost
  }
}
