import { Entity } from '../../entities/entity';
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id';
import { SearchParams } from './repository-contracts-search-params';
import { SearchResult } from './repository-contracts-search-result';
export interface RepositoryInterface<E extends Entity> {
    findById: (id: string | UniqueEntityId) => Promise<E>;
    findAll: () => Promise<E[]>;
    insert: (entity: E) => Promise<void>;
    update: (entity: E) => Promise<void>;
    remove: (id: string | UniqueEntityId) => Promise<void>;
}
export interface SearchableRepositoryInterface<E extends Entity, Filter = string, SearchInput = SearchParams, SearchOutput = SearchResult<E, Filter>> extends RepositoryInterface<E> {
    search: (props: SearchInput) => Promise<SearchOutput>;
    sortableFields: string[];
}
