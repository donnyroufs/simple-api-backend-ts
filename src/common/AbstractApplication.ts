import { Container } from 'inversify'
import { useContainer } from 'routing-controllers'
import { IAbstractApplicationOptions } from './interfaces'

export abstract class AbstractApplication {
  constructor(options: IAbstractApplicationOptions) {
    const container = new Container(options.containerOpts)

    useContainer(container)

    this.configureServices(container)
    this.boot(container)
  }

  protected abstract configureServices(container: Container): void
  protected async boot(container: Container): Promise<void> {
    process.on('SIGTERM', () => process.exit())
  }
}
