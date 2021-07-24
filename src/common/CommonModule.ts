import { ContainerModule } from 'inversify'
import { DbContext } from '@common/DbContext'
import { mapper } from '@common/Mapper'
import { DITypes } from '@common/types'

export const CommonModule = new ContainerModule((bind) => {
  bind(DITypes.Mapper).toConstantValue(mapper)
  bind(DbContext).toSelf()
})
