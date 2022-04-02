import * as classValidatorLib from 'class-validator'

import { ClassValidatorStub } from './class-validator.mocks'

describe('ClassValidator Unit Tests', () => {
  it('should initialize errors and validatedData nulled', () => {
    const validator = new ClassValidatorStub()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toBeNull()
  })

  it('should throw errors', () => {
    const validator = new ClassValidatorStub()
    const validateSyncSpy = jest.spyOn(classValidatorLib, 'validateSync')
      .mockReturnValue([{
        property: 'field',
        constraints: { isRequired: 'any_error' }
      }])

    expect(validator.validate(null)).toBeFalsy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(validator.validatedData).toBe(null)
    expect(validator.errors).toStrictEqual({ field: ['any_error'] })
  })

  it('should validate successfully', () => {
    const validator = new ClassValidatorStub()
    const validateSyncSpy = jest.spyOn(classValidatorLib, 'validateSync').mockReturnValue([])

    expect(validator.validate({ field: 'value' })).toBeTruthy()
    expect(validateSyncSpy).toHaveBeenCalled()
    expect(validator.validatedData).toStrictEqual({ field: 'value' })
    expect(validator.errors).toBeNull()
  })
})
