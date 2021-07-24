import 'dotenv/config'
import 'reflect-metadata'

import { createKoaServer, useContainer } from 'routing-controllers'

import { mapper, DbContext } from '@common/index'
import { PostController, postProfile } from '@post/index'
import { Container } from 'inversify'

export async function bootstrap() {
  const container = new Container({
    defaultScope: 'Singleton',
  })

  useContainer(container)

  const koa = createKoaServer({
    controllers: [PostController],
  })

  await Container.get(DbContext).connect()

  mapper.addProfile(postProfile)

  koa.listen(5000, () => {
    console.log('server is running on port 5000')
  })
}

bootstrap()
