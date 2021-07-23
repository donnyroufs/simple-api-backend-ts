import { Body, Get, JsonController, Post } from 'routing-controllers'
import { ControllerOptions } from 'routing-controllers/types/decorator-options/ControllerOptions'
import { Service } from 'typedi'
import { CreatePostDto } from './create-post.dto'
import { PostService } from './post.service'

export function Controller(endpoint?: string, opts?: ControllerOptions) {
  return (target: any) => {
    Service()(target)
    JsonController(endpoint, opts)(target)
  }
}

@Controller('/')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @Post('/')
  store(@Body() createPost: CreatePostDto) {
    return this._postService.create(createPost)
  }
}
