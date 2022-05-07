import { SearchParams } from '../repository-contracts-search-params'
import { SearchResult } from '../repository-contracts-search-result'
import { EntityStub, InMemorySearchableRepositoryStub } from './in-memory-searchable.repository.mocks'
describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: InMemorySearchableRepositoryStub

  beforeEach(() => {
    repository = new InMemorySearchableRepositoryStub()
  })

  describe('applyFilter()', () => {
    it('should NOT filter items when filter param is null', async () => {
      const items = [new EntityStub({ name: 'any_name', price: 10 }), new EntityStub({ name: 'any_other_name', price: 1 })]
      const filterSpy = jest.spyOn(items, 'filter' as any)
      const result = await repository['applyFilter'](items, null)

      expect(filterSpy).not.toHaveBeenCalled()
      expect(result).toStrictEqual(items)
    })

    it('should filter items using filter param', async () => {
      const items = [
        new EntityStub({ name: 'any_name', price: 10 }),
        new EntityStub({ name: 'ANY_NAME', price: 1 }),
        new EntityStub({ name: 'fake', price: 0 })
      ]
      const filterSpy = jest.spyOn(items, 'filter' as any)
      let result = await repository['applyFilter'](items, 'any_name')

      expect(filterSpy).toHaveBeenCalledTimes(1)
      expect(result).toStrictEqual([items[0], items[1]])

      result = await repository['applyFilter'](items, '0')
      expect(filterSpy).toHaveBeenCalledTimes(2)
      expect(result).toStrictEqual([items[2]])
    })
  })

  describe('applySort()', () => {
    it('should NOT sort items', async () => {
      const items = [
        new EntityStub({ name: 'a', price: 10 }),
        new EntityStub({ name: 'b', price: 1 }),
        new EntityStub({ name: 'fake', price: 0 })
      ]

      let sortedItems = await repository['applySort'](items, null, null)
      expect(sortedItems).toStrictEqual(items)

      // only name is marked as a sortable field at this repository stub
      sortedItems = await repository['applySort'](items, 'price', 'asc')
      expect(sortedItems).toStrictEqual(items)
    })

    it('should sort items by name', async () => {
      const items = [
        new EntityStub({ name: 'a', price: 10 }),
        new EntityStub({ name: 'fake', price: 0 }),
        new EntityStub({ name: 'b', price: 1 })
      ]

      let sortedItems = await repository['applySort'](items, 'name', 'asc')
      expect(sortedItems).toStrictEqual([items[0], items[2], items[1]])

      sortedItems = await repository['applySort'](items, 'name', 'desc')
      expect(sortedItems).toStrictEqual([items[1], items[2], items[0]])
    })
  })

  describe('applyPagination()', () => {
    it('should paginate items', async () => {
      const items = [
        new EntityStub({ name: 'a', price: 10 }),
        new EntityStub({ name: 'b', price: 0 }),
        new EntityStub({ name: 'c', price: 1 }),
        new EntityStub({ name: 'd', price: 1 }),
        new EntityStub({ name: 'e', price: 1 })
      ]

      let paginatedItems = await repository['applyPagination'](items, 1, 2)
      expect(paginatedItems).toStrictEqual([items[0], items[1]])

      paginatedItems = await repository['applyPagination'](items, 2, 2)
      expect(paginatedItems).toStrictEqual([items[2], items[3]])

      paginatedItems = await repository['applyPagination'](items, 3, 2)
      expect(paginatedItems).toStrictEqual([items[4]])

      paginatedItems = await repository['applyPagination'](items, 4, 2)
      expect(paginatedItems).toStrictEqual([])
    })
  })

  describe('search()', () => {
    it('should search ONLY applying pagination when other params are null', async () => {
      const entity = new EntityStub({ name: 'any_name', price: 10 })
      const items = Array(16).fill(entity)
      repository.items = items
      const result = await repository.search(new SearchParams())

      expect(result.last_page).toBe(2)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 1,
          filter: null,
          items: items.slice(0, 15),
          per_page: 15,
          sort: null,
          sort_dir: null,
          total: 16
        })
      )
    })

    it('should search applying pagination AND filter when only filter is specified', async () => {
      const items = [
        new EntityStub({ name: 'any_name', price: 10 }),
        new EntityStub({ name: 'ANY_NAME', price: 1 }),
        new EntityStub({ name: 'AnY_NAmE', price: 1 }),
        new EntityStub({ name: 'a', price: 0 })
      ]

      repository.items = items
      let result = await repository.search(
        new SearchParams({
          filter: 'any_name',
          page: 1,
          per_page: 2
        })
      )

      expect(result.last_page).toBe(2)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 1,
          filter: 'any_name',
          items: [items[0], items[1]],
          per_page: 2,
          sort: null,
          sort_dir: null,
          total: 3
        })
      )

      result = await repository.search(
        new SearchParams({
          filter: 'any_name',
          page: 2,
          per_page: 2
        })
      )

      expect(result.last_page).toBe(2)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 2,
          filter: 'any_name',
          items: [items[2]],
          per_page: 2,
          sort: null,
          sort_dir: null,
          total: 3
        })
      )
    })

    it('should search applying pagination AND sort when only sort is specified', async () => {
      const items = [
        new EntityStub({ name: 'a', price: 10 }),
        new EntityStub({ name: 'c', price: 1 }),
        new EntityStub({ name: 'b', price: 1 }),
        new EntityStub({ name: 'f', price: 0 }),
        new EntityStub({ name: 'e', price: 0 })
      ]

      repository.items = items
      let result = await repository.search(
        new SearchParams({
          filter: null,
          sort: 'name',
          sort_dir: 'asc',
          page: 1,
          per_page: 2
        })
      )

      expect(result.last_page).toBe(3)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 1,
          filter: null,
          items: [items[0], items[2]],
          per_page: 2,
          sort: 'name',
          sort_dir: 'asc',
          total: 5
        })
      )

      result = await repository.search(
        new SearchParams({
          filter: null,
          sort: 'name',
          sort_dir: 'desc',
          page: 1,
          per_page: 2
        })
      )

      expect(result.last_page).toBe(3)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 1,
          filter: null,
          items: [items[3], items[4]],
          per_page: 2,
          sort: 'name',
          sort_dir: 'desc',
          total: 5
        })
      )

      result = await repository.search(
        new SearchParams({
          filter: null,
          sort: 'name',
          sort_dir: 'desc',
          page: 2,
          per_page: 3
        })
      )

      expect(result.last_page).toBe(2)
      expect(result).toStrictEqual(
        new SearchResult({
          current_page: 2,
          filter: null,
          items: [items[2], items[0]],
          per_page: 3,
          sort: 'name',
          sort_dir: 'desc',
          total: 5
        })
      )
    })

    it('should search applying pagination AND sort AND filter', async () => {
      const items = [
        new EntityStub({ name: 'a', price: 10 }),
        new EntityStub({ name: 'A', price: 1 }),
        new EntityStub({ name: 'b', price: 1 }),
        new EntityStub({ name: 'f', price: 0 }),
        new EntityStub({ name: 'e', price: 0 })
      ]

      repository.items = items
      const scenarios = [
        {
          params: new SearchParams({
            filter: 'a',
            sort: 'name',
            sort_dir: 'asc',
            page: 1,
            per_page: 2
          }),
          results: new SearchResult({
            current_page: 1,
            filter: 'a',
            items: [items[1], items[0]],
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            total: 2
          })
        },
        {
          params: new SearchParams({
            filter: 'a',
            sort: 'name',
            sort_dir: 'desc',
            page: 1,
            per_page: 2
          }),
          results: new SearchResult({
            current_page: 1,
            filter: 'a',
            items: [items[0], items[1]],
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            total: 2
          })
        },
        {
          params: new SearchParams({
            filter: 'e',
            sort: 'name',
            sort_dir: 'desc',
            page: 10,
            per_page: 2
          }),
          results: new SearchResult({
            current_page: 10,
            filter: 'e',
            items: [],
            per_page: 2,
            sort: 'name',
            sort_dir: 'desc',
            total: 1
          })
        }
      ]

      for (const scenario of scenarios) {
        const result = await repository.search(scenario.params)
        expect(result).toStrictEqual(scenario.results)
      }
    })
  })
})
