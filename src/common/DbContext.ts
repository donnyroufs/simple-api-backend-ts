import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'

@injectable()
export class DbContext {
  private readonly _client: PrismaClient

  constructor() {
    this._client = new PrismaClient()
  }

  async connect() {
    return this._client.$connect()
  }

  get post() {
    return this._client.post
  }
}
