import { AutoMap } from '@automapper/classes'
import { BaseEntity } from '@common/types/BaseEntity'
import { Post } from '@prisma/client'

export class PostEntity implements BaseEntity<Post> {
  @AutoMap()
  id: string

  @AutoMap()
  title: string

  @AutoMap()
  createdAt: Date
}
