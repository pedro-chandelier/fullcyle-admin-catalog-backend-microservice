import { ValueObject } from './value-object'

class ValueObjectStub extends ValueObject {}

describe('ValueObject', () => {
  it('should set value', () => {
    expect(new ValueObjectStub('any_string').value).toBe('any_string')
    expect(new ValueObjectStub(1).value).toBe(1)
    expect(new ValueObjectStub({ any_key: 'any_value' }).value).toStrictEqual({ any_key: 'any_value' })
  })

  it('should convert to string', () => {
    const date = new Date()
    const someNestedObject = {
      any_prop: 'any_value',
      another_prop: {
        nested_prop: 'nested_value'
      }
    }
    const arrange = [
      { input: null, expected: 'null' },
      { input: 1, expected: '1' },
      { input: undefined, expected: 'undefined' },
      { input: 'any_string', expected: 'any_string' },
      { input: date, expected: date.toString() },
      {
        input: someNestedObject,
        expected: JSON.stringify(someNestedObject, null, 2)
      }
    ]

    arrange.forEach(({ input, expected }) => {
      const vo = new ValueObjectStub(input)
      expect(`${vo}`).toBe(expected)
    })
  })

  // it('should be immutable', () => {
  //   const vo = new ValueObjectStub({
  //     any_property: 'any_value',
  //     any_number: 10,
  //     any_array: [],
  //     nested_property: {
  //       other_prop: new Date(),
  //       another_prop: null
  //     }
  //   })
  // })
})
