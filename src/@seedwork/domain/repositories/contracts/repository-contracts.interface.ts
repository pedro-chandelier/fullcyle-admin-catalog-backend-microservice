import { Entity } from '../../entities/entity'
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id'
import { SearchParams } from './repository-contracts-search-params'

export interface RepositoryInterface<E extends Entity> {
  findById: (id: string | UniqueEntityId) => Promise<E>
  findAll: () => Promise<E[]>
  insert: (entity: E) => Promise<void>
  update: (entity: E) => Promise<void>
  remove: (id: string | UniqueEntityId) => Promise<void>
}

export interface SearcheableRepositoryInterface<E extends Entity, SearchInput = SearchParams, SearchOutput = any>
  extends RepositoryInterface<E> {
  search: (props: SearchInput) => Promise<SearchOutput>
}
