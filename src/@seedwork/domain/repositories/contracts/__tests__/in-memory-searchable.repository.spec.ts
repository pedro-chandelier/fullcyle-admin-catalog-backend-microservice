import { EntityStub, InMemorySearchableRepositoryStub } from './in-memory-searchable.repository.mocks'
describe('InMemorySearchableRepository Unit Tests', () => {
  let repository: InMemorySearchableRepositoryStub

  beforeEach(() => {
    repository = new InMemorySearchableRepositoryStub()
  })

  describe('applyFilter()', () => {
    it('should return the items unfiltered when filter param is null', async () => {
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

  describe('applySort()', () => {})

  describe('applyPaginate()', () => {})

  describe('search()', () => {})
})
