import { objectContaining } from 'expect'

import { ClassValidator } from '../validators/class-validator'
import { FieldsErrors } from '../validators/fields-validator.interface'

type Expected = { validator: ClassValidator<any>, data: any }

expect.extend({
  toContainValidationErrorMessages (expected: Expected, received: FieldsErrors) {
    const { validator, data } = expected
    const isValid = validator.validate(data)

    if (isValid) {
      return {
        pass: false,
        message: () => 'The data is valid'
      }
    }

    const isMatch = objectContaining(received).asymmetricMatch(validator.errors)
    return isMatch ? {
      pass: true,
      message: () => ''
    } : {
      pass: false,
      message: () =>
        `Expected: "${JSON.stringify(received)}"\nReceived: "${JSON.stringify(validator.errors)}"`
    }

  }
})