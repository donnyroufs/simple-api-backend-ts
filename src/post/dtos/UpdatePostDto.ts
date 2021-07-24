import { AutoMap } from '@automapper/classes'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class UpdatePostDto {
  // Should create a new decorator that handles
  // adding route parameters to the dto
  @AutoMap()
  @Expose()
  @IsString()
  id: string

  @AutoMap()
  @Expose()
  @IsString()
  title: string
}
