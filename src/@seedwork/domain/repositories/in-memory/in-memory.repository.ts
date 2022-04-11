import { SearchResult } from './../contracts/repository-contracts-search-result'
import { SearchParams } from './../contracts/repository-contracts-search-params'
import { RepositoryInterface, SearchableRepositoryInterface } from '../contracts/repository-contracts.interface'
import { Entity } from '../../entities/entity'
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id'
import { EntityNotFoundError } from '../errors/entity-not-found.error'

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = []

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`
    return this._get(_id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const itemIndex = this.items.findIndex(({ id }) => id === entity.id)
    this.items[itemIndex] = entity
  }

  async remove(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`
    await this._get(_id)
    const itemIndex = this.items.findIndex(item => item.id === _id)
    this.items.splice(itemIndex, 1)
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find(({ id: _id }) => _id === id)
    if (!item) {
      throw new EntityNotFoundError(`Entity not found from ID ${id}`)
    }
    return item
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  protected abstract applyFilter(items: E[], filter: string | null): Promise<E[]>

  protected abstract applySort(items: E[], sort: string | null, sortDir: string | null): Promise<E[]>

  protected abstract applyPagination(items: E[], page: SearchParams['page'], pageSize: SearchParams['page_size']): Promise<E[]>

  async search(props: SearchParams): Promise<SearchResult<E>> {
    const filteredItems = await this.applyFilter(this.items, props.filter)
    const sortedItems = await this.applySort(filteredItems, props.sort, props.sort_dir)
    const paginatedItems = await this.applyPagination(sortedItems, props.page, props.page_size)

    return new SearchResult({
      items: paginatedItems,
      total: filteredItems.length,
      current_page: props.page,
      page_size: props.page_size,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter
    })
  }
}
