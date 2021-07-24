import 'dotenv/config'
import 'reflect-metadata'

import Container from 'typedi'
import { createKoaServer, useContainer } from 'routing-controllers'

import { PostController } from '@post/post.controller'
import { DbContext } from '@common/db.context'
import { postProfile } from '@post/post.profile'
import { mapper } from '@common/mapper'

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

// Inversify Modules
// Url param, userId, dto mapping
// rename files (PascalCase?)
// cleanup bootstrap, perhaps application time?
