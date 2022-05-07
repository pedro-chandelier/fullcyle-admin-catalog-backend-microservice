import { FieldsErrors } from '../domain/validators/fields-validator.interface'

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainValidationErrorMessages: (received: FieldsErrors) => R
    }
  }
}
