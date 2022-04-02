import { objectContaining } from 'expect'

import { ClassValidator } from '../validators/class-validator'
import { EntityValidationError } from '../validators/errors/entity-validation.error'
import { FieldsErrors } from '../validators/fields-validator.interface'

expect.extend({
  toContainValidationErrorMessages
})

type FunctionExpected = (() => any)
type Expected = { validator: ClassValidator<any>, data: any } | FunctionExpected

function toContainValidationErrorMessages (expected: Expected, received: FieldsErrors) {
  if (typeof expected === 'function') {
    return assertWhenExpectedIsFunction(expected, received)
  }

  const { validator, data } = expected
  if (validator.validate(data)) {
    return isValid()
  }

  return assertContainsErrorMessages(received, validator.errors)
}

function isValid () {
  return { pass: false, message: () => 'The data is valid' }
}

function assertWhenExpectedIsFunction (expected: FunctionExpected, received: FieldsErrors) {
  try {
    expected()
    return isValid()
  } catch (e) {
    const error = e as EntityValidationError
    return assertContainsErrorMessages(received, error.error)
  }
}

function assertContainsErrorMessages (received: FieldsErrors, errors: FieldsErrors) {
  const isMatch = objectContaining(received).asymmetricMatch(errors)

  if (isMatch) {
    return success()
  }

  return failed(received, errors)
}

function success () {
  return { pass: true, message: () => '' }
}

function failed (received: FieldsErrors, errors: FieldsErrors) {
  return {
    pass: false,
    message: () =>
      `Expected: "${JSON.stringify(received)}"\nReceived: "${JSON.stringify(errors)}"`
  }
}