import { Controller } from '@common/ControllerDecorator'
import { Body, Delete, Get, Param, Patch, Post } from 'routing-controllers'
import { CreatePostDto } from './dtos'
import { UpdatePostDto } from './dtos/UpdatePostDto'
import { PostService } from './PostService'

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
