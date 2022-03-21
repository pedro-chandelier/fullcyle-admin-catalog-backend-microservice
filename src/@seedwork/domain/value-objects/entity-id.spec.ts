import { v4 as uuid, validate as isValidUUID } from 'uuid'

import { EntityId } from '../../../@seedwork/domain/value-objects/entity-id'
import { InvalidEntityIdError } from '../../errors/invalid-entity-id'

describe('EntityId', () => {
  it('should create an EntityId when undefined id is specified', () => {
    const entityId = new EntityId()
    expect(isValidUUID(entityId.id)).toBe(true)
  })

  it('should create an EntityId when valid id is specified', () => {
    const validId = uuid()
    const entityId = new EntityId(validId)

    expect(isValidUUID(entityId.id)).toBe(true)
    expect(entityId.id).toBe(validId)
  })

  it('should throw new invalid id is specfied', () => {
    expect(() => {
      new EntityId('invalid_id')
    }).toThrowError(InvalidEntityIdError)
  })

  it('should call private method assignId', () => {
    const assignIdSpy = jest.spyOn(EntityId.prototype as any, 'assignId')
    new EntityId()
    expect(assignIdSpy).toHaveBeenCalledTimes(1)
  })
})
