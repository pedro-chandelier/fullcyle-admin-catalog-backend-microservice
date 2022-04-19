import { SortDirection } from '../../domain/repositories/contracts/repository-contracts-search-params'

export type SearchInputDTO<Filter = string> = {
  page?: number
  per_page?: number
  sort?: string | null
  sort_dir?: SortDirection | null
  filter?: Filter | null
}
