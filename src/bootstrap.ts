import 'dotenv/config'
import 'reflect-metadata'

import Container from 'typedi'
import { createKoaServer, useContainer } from 'routing-controllers'

import { mapper } from '@common/mapper'
import { PostController } from '@post/PostController'
import { DbContext } from '@common/DbContext'
import { postProfile } from '@post/PostProfile'

export async function bootstrap() {
  useContainer(Container)

  const koa = createKoaServer({
    controllers: [PostController],
  })

  await Container.get(DbContext).connect()

  mapper.addProfile(postProfile)

  koa.listen(5000, () => {
    console.log('server is running on port 5000')
  })

  // ts-node-dev hangs with prisma; so we tell it to close manually
  process.on('SIGTERM', () => process.exit())
}

bootstrap()
