import { BaseEntity } from '@common/BaseEntity'
import { UpdateEntity } from '@common/types'

export interface IRepository<T extends BaseEntity> {
  find(): Promise<T[]>
  findOne(id: T['id']): Promise<T | null>
  save(entity: T): Promise<boolean>
  updateOne(partialEntity: UpdateEntity<T>): Promise<boolean>
  deleteOne(id: T['id']): Promise<boolean>
}
