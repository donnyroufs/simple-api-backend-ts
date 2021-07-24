import { Container } from 'inversify'
import { createKoaServer } from 'routing-controllers'
import { Mapper } from '@automapper/types'

import { AbstractApplication } from '@common/AbstractApplication'
import { DbContext } from '@common/DbContext'
import { DITypes } from '@common/types'
import { CommonModule } from '@common/CommonModule'

import { postProfile } from '@post/PostProfile'
import { PostController } from '@post/PostController'
import { PostModule } from '@post/PostModule'

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
