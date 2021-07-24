import type { MappingProfile } from '@automapper/types'
import { fromValue, ignore } from '@automapper/core'
import { v4 } from 'uuid'

import { CreatePostDto } from '@post/dtos/create-post.dto'
import { PostDto } from '@post/dtos/post.dto'
import { PostEntity } from '@post/post.entity'
import { UpdatePostDto } from '@post/dtos/update-post.dto'

export const postProfile: MappingProfile = (mapper) => {
  mapper
    .createMap(CreatePostDto, PostEntity)
    .forMember((dest) => dest.id, fromValue(v4()))
    .forMember((dest) => dest.createdAt, fromValue(new Date()))

  mapper.createMap(PostEntity, PostDto)

  mapper.createMap(PostEntity, UpdatePostDto)
  mapper
    .createMap(UpdatePostDto, PostEntity)
    .forMember((dest) => dest.createdAt, ignore())
}
