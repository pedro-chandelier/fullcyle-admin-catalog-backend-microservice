import { v4 as uuid, validate as isValidUUID } from 'uuid'

import { InvalidUniqueEntityIdError } from './invalid-unique-entity-id.error'
import { UniqueEntityId } from './unique-entity-id'

describe('EntityId', () => {
  it('should create an EntityId when valid id is specified', () => {
    const validId = uuid()
    const entityId = new UniqueEntityId(validId)

    expect(isValidUUID(entityId.value)).toBe(true)
    expect(entityId.value).toBe(validId)
  })

  it('should throw new invalid id is specfied', () => {
    expect(() => {
      new UniqueEntityId('invalid_uuid')
    }).toThrowError(InvalidUniqueEntityIdError)
  })
})
