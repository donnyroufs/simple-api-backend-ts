import { interfaces } from 'inversify'

export interface IAbstractApplicationOptions {
  containerOpts?: interfaces.ContainerOptions
  controllers: any[]
}
