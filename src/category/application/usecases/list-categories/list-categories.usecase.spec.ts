import { Category } from '#category/domain/entities/category'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { CategoryInMemoryRepository } from '#category/infra/repositories/category-in-memory.repository'

import { ListCategoriesUseCase } from './list-categories.usecase'

describe('ListCategoriesUseCase Unit Tests', () => {
  let listCategoriesUseCase: ListCategoriesUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    listCategoriesUseCase = new ListCategoriesUseCase(repository)
  })

  describe('toOutput()', () => {
    it('should return output using empty input with categories sorted by createdAt desc', async () => {
      const items = [
        new Category({ name: 'test 1' }),
        new Category({ name: 'test 2', createdAt: new Date(new Date().getTime() + 100) })
      ]
      repository.items = items
      const output = await listCategoriesUseCase.execute({})

      expect(output).toStrictEqual({
        items: [...repository.items].reverse().map(item => item.toJSON()),
        total: 2,
        current_page: 1,
        per_page: 15,
        last_page: 1
      })
    })

    it('should return output using pagination, sort and filter', async () => {
      const items = [
        new Category({ name: 'any_name' }),
        new Category({ name: 'ANY_NAME' }),
        new Category({ name: 'anY_namE' }),
        new Category({ name: 'b' }),
        new Category({ name: 'c' })
      ]
      repository.items = items
      let output = await listCategoriesUseCase.execute({
        page: 1,
        per_page: 2,
        sort: 'name',
        filter: 'any_name'
      })

      expect(output).toStrictEqual({
        items: [items[1], items[2]].map(item => item.toJSON()),
        total: 3,
        current_page: 1,
        per_page: 2,
        last_page: 2
      })

      output = await listCategoriesUseCase.execute({
        page: 2,
        per_page: 2,
        sort: 'name',
        filter: 'any_name'
      })

      expect(output).toStrictEqual({
        items: [items[0]].map(item => item.toJSON()),
        total: 3,
        current_page: 2,
        per_page: 2,
        last_page: 2
      })

      output = await listCategoriesUseCase.execute({
        page: 1,
        per_page: 2,
        sort: 'name',
        filter: 'any_name',
        sort_dir: 'desc'
      })

      expect(output).toStrictEqual({
        items: [items[0], items[2]].map(item => item.toJSON()),
        total: 3,
        current_page: 1,
        per_page: 2,
        last_page: 2
      })
    })

    test('toOutput method', () => {
      let result = new CategoryRepository.SearchResult({
        items: [],
        total: 1,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null
      })
      let output = listCategoriesUseCase['toOutput'](result)

      expect(output).toStrictEqual({
        items: [],
        total: 1,
        current_page: 1,
        per_page: 2,
        last_page: 1
      })

      const category = new Category({ name: 'Movie' })
      result = new CategoryRepository.SearchResult({
        items: [category],
        total: 1,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null
      })

      output = listCategoriesUseCase['toOutput'](result)
      expect(output).toStrictEqual({
        items: [category.toJSON()],
        total: 1,
        current_page: 1,
        per_page: 2,
        last_page: 1
      })
    })
  })
})
