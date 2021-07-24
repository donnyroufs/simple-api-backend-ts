import { BaseEntity } from '@common/base.entity'

export interface IRepository<T extends BaseEntity> {
  save(entity: T): Promise<boolean>
}
