import { AutoMap } from '@automapper/classes'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class UpdatePostDto {
  @AutoMap()
  // @Expose()
  // @IsString()
  id: string

  @AutoMap()
  @Expose()
  @IsString()
  title: string
}
