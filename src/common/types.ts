import { BaseEntity } from './base.entity'

export type UpdateEntity<T extends BaseEntity> = Pick<T, 'id'> &
  Partial<Omit<T, 'id'>>
