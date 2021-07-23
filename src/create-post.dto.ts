import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'
import { v4 } from 'uuid'
import { PostEntity } from './post.entity'

export class CreatePostDto {
  @Expose()
  @IsString()
  title: string

  static toPersistance(createPost: CreatePostDto) {
    const entity = new PostEntity()

    entity.id = v4()
    entity.title = createPost.title
    entity.createdAt = new Date()

    return entity
  }
}
