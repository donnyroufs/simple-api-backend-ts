import { ContainerModule } from 'inversify'
import { PostController } from '@post/PostController'
import { PostRepository } from '@post/PostRepository'
import { PostService } from '@post/PostService'

export const PostModule = new ContainerModule((bind) => {
  bind(PostController).toSelf()
  bind(PostService).toSelf()
  bind(PostRepository).toSelf()
})
