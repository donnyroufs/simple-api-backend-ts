import 'dotenv/config'
import 'reflect-metadata'

import { createKoaServer, useContainer } from 'routing-controllers'
import Container from 'typedi'
import { DbContext } from './db.contex'
import { PostController } from './post.controller'

export async function bootstrap() {
  useContainer(Container)

  const koa = createKoaServer({
    controllers: [PostController],
  })

  await Container.get(DbContext).connect()

  koa.listen(5000, () => {
    console.log('server is running on port 5000')
  })
}

bootstrap()
