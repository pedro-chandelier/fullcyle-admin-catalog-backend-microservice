import { SearchResult } from '#seedwork/domain/repositories/contracts/repository-contracts-search-result'
import { SearchResultMapper } from './search-output.mapper'

describe('SearchResultMapper Unit Tests', () => {
  it('should convert a SearchResult into an output', () => {
    const result = new SearchResult({
      items: ['fake' as any],
      current_page: 1,
      per_page: 1,
      total: 1,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'fake'
    })

    const output = SearchResultMapper.toOutput(result)
    expect(output).toStrictEqual({
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1
    })
  })
})
