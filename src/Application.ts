import { Container } from 'inversify'
import { createKoaServer } from 'routing-controllers'

import { AbstractApplication } from '@common/AbstractApplication'
import { PostController } from '@post/PostController'
import { DbContext } from '@common/DbContext'
import { postProfile } from '@post/PostProfile'
import { CommonModule } from '@common/CommonModule'
import { PostModule } from '@post/PostModule'
import { DITypes } from '@common/types'
import { Mapper } from '@automapper/types'

export class Application extends AbstractApplication {
  protected configureServices(container: Container): void {
    container.load(CommonModule)
    container.load(PostModule)
  }

  protected async boot(container: Container) {
    const koa = createKoaServer({
      controllers: [PostController],
    })

    const mapper = container.get<Mapper>(DITypes.Mapper)

    await container.get(DbContext).connect()

    mapper.addProfile(postProfile)

    koa.listen(5000, () => {
      console.log('server is running on port 5000')
    })

    super.boot(container)
  }
}
