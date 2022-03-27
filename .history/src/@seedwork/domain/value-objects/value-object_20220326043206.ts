import { deepFreeze } from '../utils/deep-freeze'

export abstract class ValueObject<Value = any> {
  constructor(protected readonly _value: Value) {}

  get value(): Value {
    return deepFreeze(this._value)
  }

  toString = (): string => {
    const val: any = this.value

    if (typeof val !== 'object' || val === null) {
      return this.stringifySomenthingThatIsNotAnObject(val)
    }

    const valueString = val.toString()
    return valueString === '[object Object]' ? JSON.stringify(val, null, 2) : valueString
  }

  private stringifySomenthingThatIsNotAnObject(anyValue: Value): string {
    try {
      return anyValue.toString()
    } catch (_) {
      return `${anyValue}`
    }
  }
}
