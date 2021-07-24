import { JsonController } from 'routing-controllers'
import { ControllerOptions } from 'routing-controllers/types/decorator-options/ControllerOptions'
import { Service } from 'typedi'

export function Controller(endpoint?: string, opts?: ControllerOptions) {
  return (target: any) => {
    Service()(target)
    JsonController(endpoint, opts)(target)
  }
}
