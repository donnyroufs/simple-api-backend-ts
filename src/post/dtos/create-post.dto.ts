import { AutoMap } from '@automapper/classes'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

export class CreatePostDto {
  @AutoMap()
  @Expose() // TODO: Get rid of expose?
  @IsString()
  title: string
}
