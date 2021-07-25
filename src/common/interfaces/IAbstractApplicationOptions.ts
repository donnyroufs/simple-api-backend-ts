import { ContainerModule, interfaces } from 'inversify'

export interface IAbstractApplicationOptions {
  containerOpts?: interfaces.ContainerOptions
	modules: ContainerModule[]
  controllers: any[]
}
