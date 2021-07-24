import { Controller } from '@common/controller.decorator'
import { Body, Delete, Get, Param, Patch, Post } from 'routing-controllers'
import { CreatePostDto } from './dtos'
import { UpdatePostDto } from './dtos/update-post.dto'
import { PostService } from './post.service'

@Controller('/post')
export class PostController {
  constructor(private readonly _postService: PostService) {}

  @Get('/')
  index() {
    return this._postService.find()
  }

  @Get('/:id')
  show(@Param('id') id: string) {
    return this._postService.findOne(id)
  }

  @Post('/')
  store(@Body() createPost: CreatePostDto) {
    return this._postService.create(createPost)
  }

  @Patch('/:id')
  update(@Body() updatePost: UpdatePostDto) {
    return this._postService.updateOne(updatePost)
  }

  @Delete('/:id')
  destroy(@Param('id') id: string) {
    return this._postService.deleteOne(id)
  }
}
