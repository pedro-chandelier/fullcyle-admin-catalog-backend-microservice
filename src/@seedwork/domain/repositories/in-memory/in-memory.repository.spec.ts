import { EntityStub, InMemoryRepositoryStub } from './in-memory.repository.mocks'
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id'
import { EntityNotFoundError } from '../errors/entity-not-found.error'
describe('InMemoryRepository Unit Tests', () => {
  let repository: InMemoryRepositoryStub

  beforeEach(() => {
    repository = new InMemoryRepositoryStub()
  })

  describe('insert()', () => {
    it('should insert a new entity', async () => {
      const entity = new EntityStub({ name: 'name', price: 5 })
      await repository.insert(entity)
      expect(repository.items.length).toBe(1)
      expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON())
    })
  })

  describe('findById()', () => {
    it('should throw an error when entity is not found', async () => {
      const id = new UniqueEntityId().id
      expect(repository.findById(new UniqueEntityId())).rejects.toThrowError(EntityNotFoundError)
      expect(repository.findById(id)).rejects.toThrowError(`Entity not found from ID ${id}`)
    })

    it('should find an entity by id as UniqueEntityId', async () => {
      const entity = new EntityStub({ name: 'name', price: 5 })
      await repository.insert(entity)

      let entityFound = await repository.findById(entity.id)
      expect(entityFound.toJSON()).toStrictEqual(entity.toJSON())

      entityFound = await repository.findById(entity.uniqueEntityId)
      expect(entityFound.toJSON()).toStrictEqual(entity.toJSON())
    })
  })

  describe('findAll()', () => {
    it('should find an entity by id as UniqueEntityId', async () => {
      const entity = new EntityStub({ name: 'name_1', price: 5 })
      const entity_2 = new EntityStub({ name: 'name_2', price: 10 })

      await repository.insert(entity)
      await repository.insert(entity_2)
      const entities = await repository.findAll()

      expect(entities.length).toBe(2)
      expect(entities).toStrictEqual([entity, entity_2])
    })
  })

  describe('update()', () => {
    it('should throw when update is called upon unexisting entity', async () => {
      const entity = new EntityStub({ name: 'name_1', price: 5 })
      expect(repository.update(entity)).rejects.toThrowError(`Entity not found from ID ${entity.id}`)
    })

    it('should successfully update an entity', async () => {
      const entity = new EntityStub({ name: 'name_1', price: 5 })
      await repository.insert(entity)
      expect(repository.findById(entity.id)).resolves.toStrictEqual(entity)

      entity.props.name = 'updated'
      entity.props.price = 10
      await repository.update(entity)
      const updatedEntity = await repository.findById(entity.id)

      expect(updatedEntity.id).toBe(entity.id)
      expect(updatedEntity.props.name).toBe('updated')
      expect(updatedEntity.props.price).toBe(10)
    })
  })

  describe('remove()', () => {
    it('should throw when remove is called upon unexisting entity', async () => {
      const entity = new EntityStub({ name: 'name_1', price: 5 })
      expect(repository.remove(entity.id)).rejects.toThrowError(`Entity not found from ID ${entity.id}`)
      expect(repository.remove(entity.uniqueEntityId)).rejects.toThrowError(`Entity not found from ID ${entity.id}`)
    })

    it('should successfully remove an entity', async () => {
      const entity = new EntityStub({ name: 'name_1', price: 5 })

      await repository.insert(entity)
      expect(repository.findById(entity.id)).resolves.toStrictEqual(entity)

      await repository.remove(entity.id)
      expect(repository.items.length).toBe(0)
      expect(repository.findById(entity.id)).rejects.toThrowError(`Entity not found from ID ${entity.id}`)
    })
  })
})
