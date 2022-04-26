export function deepFreeze<T>(anObject: T): T {
  if (!anObject || typeof anObject !== 'object') return anObject

  const propertyNames = Object.getOwnPropertyNames(anObject)
  for (const name of propertyNames) {
    const value: any = anObject[name as keyof T]

    if (value && typeof value === 'object') {
      deepFreeze(value)
    }
  }

  return Object.freeze(anObject)
}
