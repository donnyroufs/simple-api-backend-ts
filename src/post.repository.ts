import { Service } from 'typedi'
import { DbContext } from './db.contex'
import { PostEntity } from './post.entity'

@Service()
export class PostRepository {
  constructor(private readonly _dbContext: DbContext) {}

  public async save(entity: PostEntity) {
    const createdEntity = await this._dbContext.post.create({
      data: entity,
    })

    return !!createdEntity
  }
}
