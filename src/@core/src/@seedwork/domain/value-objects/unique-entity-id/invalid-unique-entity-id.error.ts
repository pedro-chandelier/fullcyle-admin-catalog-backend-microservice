export class InvalidUniqueEntityIdError extends Error {
  constructor() {
    super('EntityId must be a valid uuid')
    this.name = 'InvalidUniqueEntityIdError'
  }
}
