import { Entity } from '../entities/entity'
import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

export interface RepositoryInterface<E extends Entity> {
  findById: (id: string | UniqueEntityId) => Promise<E>
  findAll: () => Promise<E[]>
  insert: (entity: E) => Promise<void>
  update: (entity: E) => Promise<void>
  remove: (id: string | UniqueEntityId) => Promise<void>
}
