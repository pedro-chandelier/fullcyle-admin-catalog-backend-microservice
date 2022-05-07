import { SearchOutputDTO } from '#seedwork/application/dtos/search-output.dto'
import { SearchResult } from '#seedwork/domain/repositories/contracts/repository-contracts-search-result'

export class SearchResultMapper {
  static toOutput(result: SearchResult): Omit<SearchOutputDTO, 'items'> {
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page
    }
  }
}
