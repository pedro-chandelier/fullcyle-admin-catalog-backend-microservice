import { validateSync, ValidationError } from 'class-validator'
import { FieldsErrors, FieldsValidatorInterface } from './fields-validator.interface'

export abstract class ClassValidator<ValidatedProps> implements FieldsValidatorInterface<ValidatedProps> {
  errors: FieldsErrors = null
  validatedData: ValidatedProps = null

  validate(data: any): boolean {
    const errors = validateSync(data)

    if (errors.length) {
      this.aggregateErrorMessages(errors)
      return false
    }

    this.validatedData = data
    return true
  }

  private aggregateErrorMessages(errors: ValidationError[]): void {
    this.errors = {}

    for (const error of errors) {
      const field = error.property
      this.errors[field] = Object.values(error.constraints)
    }
  }
}
