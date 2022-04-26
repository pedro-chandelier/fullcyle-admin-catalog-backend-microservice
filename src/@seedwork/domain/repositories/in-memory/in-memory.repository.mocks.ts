import { Entity } from '#seedwork/domain/entities/entity'
import { InMemoryRepository } from './in-memory.repository'

export type EntityPropsStub = {
  name: string
  price: number
}

export class EntityStub extends Entity<EntityPropsStub> {}

export class InMemoryRepositoryStub extends InMemoryRepository<EntityStub> {}
