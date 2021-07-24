import { Service } from 'typedi'

import { DbContext, IRepository } from '@common/index'
import { PostEntity } from '@post/index'

@Service()
export class PostRepository implements IRepository<PostEntity> {
  constructor(private readonly _dbContext: DbContext) {}

  public async save(entity: PostEntity) {
    const createdEntity = await this._dbContext.post.create({
      data: entity,
    })

    return !!createdEntity
  }
}
