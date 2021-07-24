import 'dotenv/config'
import 'reflect-metadata'

import { Application } from './Application'

new Application({
  containerOpts: {
    defaultScope: 'Singleton',
  },
})
