import { ClassValidatorStub, RulesStub } from './class-validator.mocks'

describe('ClassValidator Integration Tests', () => {
  it('should throw errors', () => {
    const validator = new ClassValidatorStub()

    expect(validator.validate({})).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters'],
      price: ['price should not be empty', 'price must be a number conforming to the specified constraints']
    })
  })

  it('should successfully validate', () => {
    const validator = new ClassValidatorStub()

    expect(validator.validate({ name: 'any_name', price: 10000 })).toBeTruthy()
    expect(validator.errors).toBeNull()
    expect(validator.validatedData).toStrictEqual(new RulesStub({ name: 'any_name', price: 10000 }))
  })
})
