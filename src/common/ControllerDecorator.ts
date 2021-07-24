import { injectable } from 'inversify'
import { JsonController } from 'routing-controllers'
import { ControllerOptions } from 'routing-controllers/types/decorator-options/ControllerOptions'

export function Controller(endpoint?: string, opts?: ControllerOptions) {
  return (target: any) => {
    injectable()(target)
    JsonController(endpoint, opts)(target)
  }
}
