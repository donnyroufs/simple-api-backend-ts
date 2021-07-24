import { ContainerModule } from 'inversify'
import { DbContext } from './DbContext'
import { mapper } from './Mapper'
import { DITypes } from './types'

export const CommonModule = new ContainerModule((bind) => {
  bind(DITypes.Mapper).toConstantValue(mapper)
  bind(DbContext).toSelf()
})
