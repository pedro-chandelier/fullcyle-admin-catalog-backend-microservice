import { SearchResult } from './../contracts/repository-contracts-search-result';
import { SearchParams, SortDirection } from './../contracts/repository-contracts-search-params';
import { RepositoryInterface, SearchableRepositoryInterface } from '../contracts/repository-contracts.interface';
import { Entity } from '../../entities/entity';
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id';
export declare abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
    items: E[];
    findById(id: string | UniqueEntityId): Promise<E>;
    findAll(): Promise<E[]>;
    insert(entity: E): Promise<void>;
    update(entity: E): Promise<void>;
    remove(id: string | UniqueEntityId): Promise<void>;
    protected _get(id: string): Promise<E>;
}
export declare abstract class InMemorySearchableRepository<E extends Entity> extends InMemoryRepository<E> implements SearchableRepositoryInterface<E> {
    sortableFields: string[];
    protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>;
    protected applySort(items: E[], sort: string | null, sortDir: SortDirection | null): Promise<E[]>;
    private canSort;
    protected applyPagination(items: E[], page: SearchParams['page'], itemsPerPage: SearchParams['per_page']): Promise<E[]>;
    search(props: SearchParams): Promise<SearchResult<E>>;
}
