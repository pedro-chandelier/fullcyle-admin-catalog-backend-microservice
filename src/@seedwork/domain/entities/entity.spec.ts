import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id'
import { Entity } from './entity'
import { validate as uuidValidate } from 'uuid'

class EntityStub extends Entity<{ prop1: string; prop2: number }> {}

describe('Entity', () => {
  it('should set props and id', () => {
    const arrange = { prop1: 'prop1_value', prop2: 10 }
    const entity = new EntityStub(arrange)

    expect(entity.props).toStrictEqual(arrange)
    expect(entity.uniqueEntityId).toBeInstanceOf(UniqueEntityId)
    expect(uuidValidate(entity.id)).toBeTruthy()
  })

  it('should accept a valid uuid', () => {
    const uniqueEntityId = new UniqueEntityId()
    const arrange = { prop1: 'prop1_value', prop2: 10, id: uniqueEntityId }
    const entity = new EntityStub(arrange)

    expect(entity.id).toBe(uniqueEntityId.value)
  })

  it('should convert an entity to a javascript object', () => {
    const uniqueEntityId = new UniqueEntityId()
    const arrange = { prop1: 'prop1_value', prop2: 10, id: uniqueEntityId }
    const entity = new EntityStub(arrange)

    expect(entity.toJSON()).toStrictEqual({ id: entity.id, ...arrange })
  })
})
