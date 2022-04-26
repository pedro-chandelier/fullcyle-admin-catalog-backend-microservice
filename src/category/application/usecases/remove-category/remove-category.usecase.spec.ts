import { Category } from '#category/domain/entities/category'
import { CategoryInMemoryRepository } from '#category/infra/repositories/category-in-memory.repository'
import { EntityNotFoundError } from '#seedwork/domain/repositories/errors/entity-not-found.error'

import { FindCategoryByIdUseCase } from '../find-category/find-category-by-id.usecase'
import { RemoveCategoryUseCase } from './remove-category.usecase'

describe('RemoveCategory Unit Tests', () => {
  let findCategoryUseCase: FindCategoryByIdUseCase
  let removeCategoryUseCase: RemoveCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    findCategoryUseCase = new FindCategoryByIdUseCase(repository)
    removeCategoryUseCase = new RemoveCategoryUseCase(repository)
  })

  it('should throw EntityNotFoundError when specified category id not exists', async () => {
    expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(EntityNotFoundError)
  })

  it('should remove a category by id', async () => {
    const category = new Category({ name: 'any_name' })
    repository.items = [category]
    const findByIdSpy = jest.spyOn(repository, 'findById')
    const removeSpy = jest.spyOn(repository, 'remove')
    const id = category.id

    await removeCategoryUseCase.execute(id)

    expect(findByIdSpy).toHaveBeenCalledTimes(1)
    expect(findByIdSpy).toHaveBeenCalledWith(id)
    expect(removeSpy).toHaveBeenCalledTimes(1)
    expect(removeSpy).toHaveBeenCalledWith(id)
    expect(repository.items).toEqual([])
  })
})
