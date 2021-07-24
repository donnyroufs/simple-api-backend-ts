import { ContainerModule } from 'inversify'
import { PostController } from './PostController'
import { PostRepository } from './PostRepository'
import { PostService } from './PostService'

export const PostModule = new ContainerModule((bind) => {
  bind(PostController).toSelf()
  bind(PostService).toSelf()
  bind(PostRepository).toSelf()
})
