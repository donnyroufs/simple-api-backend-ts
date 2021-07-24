export class ServiceException extends Error {
  constructor(message: string, public readonly location?: string) {
    super(message)
  }
}
