import { Controller } from '@common/ControllerDecorator'
import { Context } from 'koa'
import { Body, Ctx, Delete, Get, Param, Patch, Post } from 'routing-controllers'
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
  async show(@Param('id') id: string, @Ctx() ctx: Context) {
    const res = await this._postService.findOne(id)

    ctx.status = res.err ? 404 : 200

    return res.val
  }

  @Post('/')
  async store(@Body() createPost: CreatePostDto, @Ctx() ctx: Context) {
    const res = await this._postService.create(createPost)

    ctx.status = res.err ? 400 : 201

    return res.val
  }

  @Patch('/:id')
  async update(
    @Body() updatePost: UpdatePostDto,
    @Param('id') id: string,
    @Ctx() ctx: Context
  ) {
    updatePost.id = id
    const res = await this._postService.updateOne(updatePost)

    ctx.status = res.err ? 400 : 204

    return res.val
  }

  @Delete('/:id')
  async destroy(@Param('id') id: string, @Ctx() ctx: Context) {
    const res = await this._postService.deleteOne(id)

    ctx.status = res.err ? 400 : 204

    return res.val
  }
}
