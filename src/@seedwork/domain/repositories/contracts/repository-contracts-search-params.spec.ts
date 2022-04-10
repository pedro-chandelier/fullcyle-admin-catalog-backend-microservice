import { SearchParams } from './repository-contracts-search-params'
describe('SearchParams Unit Tests', () => {
  test('page prop', () => {
    const testCases = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: '', expected: 1 },
      { page: 0, expected: 1 },
      { page: 5, expected: 5 },
      { page: 5.5, expected: 5 },
      { page: '10', expected: 10 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },
      { page: [], expected: 1 }
    ]

    let params = new SearchParams()
    expect(params.page).toBe(1)

    for (const testCase of testCases) {
      params = new SearchParams({ page: testCase.page as any })
      expect(params.page).toBe(testCase.expected)
    }
  })

  test('page_size prop', () => {
    const testCases = [
      { page_size: null, expected: 15 },
      { page_size: undefined, expected: 15 },
      { page_size: '', expected: 15 },
      { page_size: 0, expected: 15 },
      { page_size: 5.5, expected: 5 },
      { page_size: '10', expected: 10 },
      { page_size: false, expected: 15 },
      { page_size: true, expected: 15 },
      { page_size: {}, expected: 15 },
      { page_size: [], expected: 15 },
      { page_size: 5, expected: 5 },
      { page_size: 20, expected: 20 }
    ]

    let params = new SearchParams()
    expect(params.page_size).toBe(15)

    for (const testCase of testCases) {
      params = new SearchParams({ page_size: testCase.page_size as any })
      expect(params.page_size).toBe(testCase.expected)
    }
  })

  test('sort prop', () => {
    const testCases = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: '', expected: null },
      { sort: 0, expected: '0' },
      { sort: 5.5, expected: '5.5' },
      { sort: '10', expected: '10' },
      { sort: false, expected: 'false' },
      { sort: true, expected: 'true' },
      { sort: {}, expected: '[object Object]' },
      { sort: 'any_field', expected: 'any_field' }
    ]

    let params = new SearchParams()
    expect(params.sort).toBe(null)

    for (const testCase of testCases) {
      params = new SearchParams({ sort: testCase.sort as any })
      expect(params.sort).toBe(testCase.expected)
    }
  })

  test('sort_dir prop', () => {
    const testCases = [
      { sort: null, sort_dir: null, expected: null },
      { sort: undefined, sort_dir: undefined, expected: null },
      { sort: '', sort_dir: 'any_field', expected: null },
      { sort: null, sort_dir: 'any_field', expected: null },
      { sort: undefined, sort_dir: 'any_field', expected: null },
      { sort: '', sort_dir: 'any_field', expected: null },
      { sort: '10', sort_dir: 'asc', expected: 'asc' },
      { sort: false, sort_dir: 'asc', expected: 'asc' },
      { sort: true, sort_dir: 'asc', expected: 'asc' },
      { sort: 'any_field', sort_dir: 'asc', expected: 'asc' },
      { sort: '10', sort_dir: 'desc', expected: 'desc' },
      { sort: false, sort_dir: 'desc', expected: 'desc' },
      { sort: true, sort_dir: 'desc', expected: 'desc' },
      { sort: 'any_field', sort_dir: 'desc', expected: 'desc' }
    ]

    let params = new SearchParams()
    expect(params.sort).toBe(null)

    for (const testCase of testCases) {
      params = new SearchParams({
        sort: testCase.sort as any,
        sort_dir: testCase.sort_dir as any
      })
      expect(params.sort_dir).toBe(testCase.expected)
    }
  })

  test('filter prop', () => {
    const testCases = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: '', expected: null },
      { filter: 0, expected: '0' },
      { filter: 5, expected: '5' },
      { filter: 5.5, expected: '5.5' },
      { filter: '10', expected: '10' },
      { filter: true, expected: 'true' },
      { filter: false, expected: 'false' },
      { filter: {}, expected: '[object Object]' },
      { filter: [], expected: '' },
      { filter: 'any_filter', expected: 'any_filter' },
      { filter: 'ANY_FILTER', expected: 'ANY_FILTER' }
    ]

    for (const testCase of testCases) {
      const params = new SearchParams({ filter: testCase.filter as any })
      expect(params.filter).toBe(testCase.expected)
    }
  })
})
