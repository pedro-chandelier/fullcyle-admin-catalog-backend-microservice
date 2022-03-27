import { deepFreeze } from './deep-freeze'

describe('deepFreeze', () => {
  it('should not freeze a scalar value', () => {
    expect(typeof deepFreeze(true)).toBe('boolean')
    expect(typeof deepFreeze(false)).toBe('boolean')
    expect(typeof deepFreeze('any_string')).toBe('string')
    expect(typeof deepFreeze(10)).toBe('number')
    expect(deepFreeze(true)).toBe(true)
    expect(deepFreeze(false)).toBe(false)
    expect(deepFreeze('any_string')).toBe('any_string')
    expect(deepFreeze(10)).toBe(10)
  })

  it('should make a nested object immutable', () => {
    const immutable = deepFreeze({
      prop_1: 'value_1',
      nested: {
        prop_2: true,
        prop_3: new Date()
      }
    })

    expect(() => {
      immutable.nested.prop_2 = false
    }).toThrow()

    expect(() => {
      immutable.prop_1 = 'another_value'
    }).toThrow()

    expect(() => {
      immutable.nested.prop_3 = new Date()
    }).toThrow()

    expect(immutable.prop_1).toBe('value_1')
    expect(immutable.nested.prop_2).toBe(true)
    expect(immutable.nested.prop_3).toBeInstanceOf(Date)
  })
})
