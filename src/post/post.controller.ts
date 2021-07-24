import { Body, Get, Post } from 'routing-controllers'

import { PostService, CreatePostDto } from '@post/index'
import { Controller } from '@common/index'

@Controller('/post')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @Get('/')
  index() {
    // TODO
    return []
  }

  @Post('/')
  store(@Body() createPost: CreatePostDto) {
    return this._postService.create(createPost)
  }
}
