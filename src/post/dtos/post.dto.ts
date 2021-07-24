import { AutoMap } from '@automapper/classes'

export class PostDto {
  @AutoMap()
  id: string

  @AutoMap()
  title: string
}
