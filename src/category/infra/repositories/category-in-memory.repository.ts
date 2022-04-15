import { SortDirection } from '@seedwork/domain/repositories/contracts/repository-contracts-search-params'
import { InMemorySearchableRepository } from '../../../@seedwork/domain/repositories/in-memory/in-memory.repository'
import { Category } from '../../domain/entities/category'
import { CategoryRepository } from '../../domain/repositories/category.repository'

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
  sortableFields = ['created_at', 'name', 'description']

  protected async applyFilter(items: Category[], filter: CategoryRepository.Filter): Promise<Category[]> {
    if (!filter) return items

    return items.filter(e => {
      return e.props[filter].toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(items: Category[], sort: string | null, sortDir: SortDirection | null): Promise<Category[]> {
    return sort ? super.applySort(items, sort, sortDir) : super.applySort(items, 'created_at', 'desc')
  }
}
