import { Container } from 'inversify'
import {
  createKoaServer,
  getMetadataArgsStorage,
  RoutingControllersOptions,
} from 'routing-controllers'
import { Mapper } from '@automapper/types'

import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

// @ts-expect-error missing types but we don't really care
import { defaultMetadataStorage } from 'class-transformer/cjs/storage'
import { koaSwagger } from 'koa2-swagger-ui'

import { AbstractApplication } from '@common/AbstractApplication'
import { DbContext } from '@common/DbContext'
import { DITypes } from '@common/types'
import { CommonModule } from '@common/CommonModule'

import { postProfile } from '@post/PostProfile'
import { PostController } from '@post/PostController'
import { PostModule } from '@post/PostModule'

console.clear()

export class Application extends AbstractApplication {
  protected configureServices(container: Container): void {
    container.load(CommonModule)
    container.load(PostModule)
  }

  protected async boot(container: Container) {
    const routingControllersOptions: RoutingControllersOptions = {
      controllers: [PostController],
      routePrefix: '/api',
    }

    const koa = createKoaServer(routingControllersOptions)

    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    })

    const storage = getMetadataArgsStorage()
    const spec = routingControllersToSpec(storage, routingControllersOptions, {
      components: {
        schemas,
      },
      info: {
        title: 'PostR',
        version: '1.0.0',
      },
    })

    koa.use(
      koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions: {
          spec,
        },
      })
    )

    const mapper = container.get<Mapper>(DITypes.Mapper)

    await container
      .get(DbContext)
      .connect()
      .catch((err) => console.error(err))

    mapper.addProfile(postProfile)

    koa.listen(process.env.PORT, () => {
      console.log(`✅ server is up and running`)
      console.log(`swagger http://localhost:${process.env.PORT}/swagger`)
    })

    super.boot(container)
  }
}
