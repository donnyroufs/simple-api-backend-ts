import { classes } from '@automapper/classes'
import { createMapper } from '@automapper/core'

export const mapper = createMapper({
  name: 'app',
  pluginInitializer: classes,
})
