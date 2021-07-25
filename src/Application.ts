import { Container } from 'inversify'
import { Mapper } from '@automapper/types'

import { AbstractApplication } from '@common/AbstractApplication'
import { DbContext } from '@common/DbContext'
import { CommonModule } from '@common/CommonModule'

import { postProfile } from '@post/PostProfile'
import { PostController } from '@post/PostController'
import { PostModule } from '@post/PostModule'
import { IApplicationContext } from '@common/interfaces/IApplicationContext'
import Koa from 'koa'

export class Application extends AbstractApplication {
  constructor() {
    super({
      controllers: [PostController],
      containerOpts: {
        defaultScope: 'Singleton',
      },
    })
  }

  protected configureServices(container: Container, mapper: Mapper): void {
    mapper.addProfile(postProfile)

    container.load(CommonModule)
    container.load(PostModule)
  }

  protected async boot(ctx: IApplicationContext<Koa>) {
    this.connectDatabase(ctx.container.get(DbContext))

    super.boot(ctx)
  }

  private async connectDatabase(ctx: DbContext) {
    ctx.connect().catch((err) => console.error(err))
  }
}
