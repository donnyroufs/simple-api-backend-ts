import { Service } from 'typedi'
import { CreatePostDto } from './create-post.dto'
import { PostRepository } from './post.repository'

@Service()
export class PostService {
  constructor(private readonly _postRepo: PostRepository) {}
  public async create(createPost: CreatePostDto) {
    const entity = CreatePostDto.toPersistance(createPost)
    const isSaved = await this._postRepo.save(entity)

    if (!isSaved) {
      throw new Error('something went wrong.')
    }

    return entity
  }
}
