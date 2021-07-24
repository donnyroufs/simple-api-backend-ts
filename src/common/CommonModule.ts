import { ContainerModule } from 'inversify'
import { DbContext } from './DbContext'

export const CommonModule = new ContainerModule((bind) => {
  // TODO: Add Mapper
  bind(DbContext).toSelf()
})
