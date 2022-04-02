import { ValidationError } from './errors/validation.error'

export class RulesValidator {
  private constructor(private value: any, private readonly property: string) { }

  static validate (value: any, property: string) {
    return new RulesValidator(value, property)
  }

  required (): Omit<this, 'required'> {
    if (this.value === null || this.value === undefined || this.value === '') {
      throw new ValidationError(`"${this.property}" is required`)
    }
    return this
  }

  string (): Omit<this, 'string'> {
    if (!this.isEmpty(this.value) && typeof this.value !== 'string') {
      throw new ValidationError(`"${this.property}" must be a string`)
    }
    return this
  }

  maxLength (length: number): Omit<this, 'maxLength'> {
    if (!this.isEmpty(this.value) && this.value.length > length) {
      throw new ValidationError(`"${this.property}" length must be less than or equal to ${length}`)
    }
    return this
  }

  boolean (): Omit<this, 'boolean'> {
    if (!this.isEmpty(this.value) && typeof this.value !== 'boolean') {
      throw new ValidationError(`"${this.property}" must be a boolean`)
    }
    return this
  }

  private isEmpty (value: any): boolean {
    return value === null || value === undefined
  }
}
