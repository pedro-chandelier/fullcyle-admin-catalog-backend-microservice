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
        new EntityStub({ name: 'e', price: 1 }),
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
  })
})
