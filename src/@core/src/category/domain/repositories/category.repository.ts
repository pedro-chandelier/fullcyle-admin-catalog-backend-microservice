import { SearchParams as DefaultSearchParams } from '#seedwork/domain/repositories/contracts/repository-contracts-search-params'
import { SearchResult as DefaultSearchResult } from '#seedwork/domain/repositories/contracts/repository-contracts-search-result'
import { SearchableRepositoryInterface } from '#seedwork/domain/repositories/contracts/repository-contracts.interface'

import { Category } from '../entities/category'

export namespace CategoryRepository {
  export type Filter = string

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {}
}
