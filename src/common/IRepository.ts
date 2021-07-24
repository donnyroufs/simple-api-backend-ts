import { BaseEntity } from '@common/base.entity'
import { UpdateEntity } from './types'

export interface IRepository<T extends BaseEntity> {
  find(): Promise<T[]>
  findOne(id: T['id']): Promise<T | null>
  save(entity: T): Promise<boolean>
  updateOne(partialEntity: UpdateEntity<T>): Promise<boolean>
  deleteOne(id: T['id']): Promise<boolean>
}
