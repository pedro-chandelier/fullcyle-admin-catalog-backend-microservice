import { FieldsErrors } from '../fields-validator.interface'

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super('Entity Validation Error')
    this.name = 'EntityValidationError'
  }
}
