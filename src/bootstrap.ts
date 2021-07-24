import 'dotenv/config'
import 'reflect-metadata'

// import Container from 'typedi'
import { Container } from 'inversify'
import { createKoaServer, useContainer } from 'routing-controllers'

import { mapper } from '@common/Mapper'
import { PostController } from '@post/PostController'
import { DbContext } from '@common/DbContext'
import { postProfile } from '@post/PostProfile'
import { CommonModule } from '@common/CommonModule'
import { PostModule } from '@post/PostModule'

export async function bootstrap() {
  const container = new Container({
    defaultScope: 'Singleton',
  })

  useContainer(container)

  container.load(CommonModule)
  container.load(PostModule)

  const koa = createKoaServer({
    controllers: [PostController],
  })

  await container.get(DbContext).connect()

  mapper.addProfile(postProfile)

  koa.listen(5000, () => {
    console.log('server is running on port 5000')
  })

  // ts-node-dev hangs with prisma; so we tell it to close manually
  process.on('SIGTERM', () => process.exit())
}

bootstrap()
