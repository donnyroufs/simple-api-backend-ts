import { AutoMap } from '@automapper/classes'
import { Post } from '@prisma/client'

import { BaseEntity } from '@common/index'

export class PostEntity extends BaseEntity implements Post {
  @AutoMap()
  title: string

  @AutoMap()
  createdAt: Date
}
