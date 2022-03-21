export class InvalidEntityIdError extends Error {
  constructor() {
    super('EntityId must be a valid uuid')
    this.name = 'InvalidEntityIdError'
  }
}