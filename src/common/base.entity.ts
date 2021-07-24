import { AutoMap } from '@automapper/classes'

export class BaseEntity {
  @AutoMap()
  public id: string
}
