import { Container } from 'inversify'

export interface IApplicationContext<T> {
  server: T
  container: Container
}
