import { Category } from '#category/domain/entities/category'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { SortDirection } from '#seedwork/domain/repositories/contracts/repository-contracts-search-params'
import { InMemorySearchableRepository } from '#seedwork/domain/repositories/in-memory/in-memory.repository'

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
  sortableFields = ['createdAt', 'name', 'description']

  protected async applyFilter(items: Category[], filter: CategoryRepository.Filter | null): Promise<Category[]> {
    if (!filter) return items

    return items.filter(e => {
      return e.props.name.toLowerCase().includes(filter.toLowerCase())
    })
  }

  protected async applySort(items: Category[], sort: string | null, sortDir: SortDirection | null): Promise<Category[]> {
    return sort ? super.applySort(items, sort, sortDir) : super.applySort(items, 'createdAt', 'desc')
  }
}
