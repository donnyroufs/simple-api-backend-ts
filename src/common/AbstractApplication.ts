import { Mapper } from '@automapper/types'
import { Container, ContainerModule } from 'inversify'
import { RoutingControllersOptions, useContainer } from 'routing-controllers'
import { IAbstractApplicationOptions } from './interfaces'
import { mapper } from './Mapper'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { validationMetadatasToSchemas } from 'class-validator-jsonschema'

// @ts-expect-error missing types but we don't really care
import { defaultMetadataStorage } from 'class-transformer/cjs/storage'
import { koaSwagger } from 'koa2-swagger-ui'

import { createKoaServer, getMetadataArgsStorage } from 'routing-controllers'
import { IApplicationContext } from './interfaces/IApplicationContext'
import Koa from 'koa'

export abstract class AbstractApplication {
  private _server: Koa

  constructor(options: IAbstractApplicationOptions) {
    const container = new Container(options.containerOpts)

    useContainer(container)

    this.configureServices(container, mapper)
    this.preBoot(options.modules, container)
    this.boot({ container, server: this._server })
  }

  protected abstract configureServices(
    container: Container,
    mapper: Mapper
  ): void

  protected async boot(context: IApplicationContext<T>): Promise<void> {
    process.on('SIGTERM', () => process.exit())

    this._server.listen(process.env.PORT, () => {
      console.log(`✅ server is up and running`)
      console.log(`swagger http://localhost:${process.env.PORT}/swagger`)
    })
  }

  private preBoot(modules: ContainerModule[], container: Container) {
    this.loadModules(modules, container)
    const routingControllersOptions: RoutingControllersOptions = {
      controllers: [],
      routePrefix: '/api',
    }

    this._server = this.createServer(routingControllersOptions)
    this.setupSwagger(routingControllersOptions)
  }

  private createServer(opts: RoutingControllersOptions) {
    return createKoaServer(opts)
  }

  private setupSwagger(options: RoutingControllersOptions) {
    const schemas = validationMetadatasToSchemas({
      classTransformerMetadataStorage: defaultMetadataStorage,
      refPointerPrefix: '#/components/schemas/',
    })

    const storage = getMetadataArgsStorage()
    const spec = routingControllersToSpec(storage, options, {
      components: {
        schemas,
      },
      info: {
        title: 'PostR',
        version: '1.0.0',
      },
    })
    this._server.use(
      koaSwagger({
        routePrefix: '/swagger',
        swaggerOptions: {
          spec,
        },
      })
    )
  }

  private loadModules(modules: ContainerModule[], container: Container) {
    modules.forEach((module) => container.load(module))
  }
}
