import type { MappingProfile } from '@automapper/types'
import { ignore, mapFrom } from '@automapper/core'
import { v4 } from 'uuid'

import { PostDto } from '@post/dtos/PostDto'
import { PostEntity } from '@post/PostEntity'
import { UpdatePostDto, CreatePostDto } from '@post/dtos'

export const postProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(CreatePostDto, PostEntity)
    .forMember(
      (dest) => dest.id,
      mapFrom(() => v4())
    )
    .forMember(
      (dest) => dest.createdAt,
      mapFrom(() => new Date())
    )

  mapper.createMap(PostEntity, PostDto)

  mapper.createMap(PostEntity, UpdatePostDto)
  mapper
    .createMap(UpdatePostDto, PostEntity)
    .forMember((dest) => dest.createdAt, ignore())
}
