import { EntityNotFoundError } from '../../../../@seedwork/domain/repositories/errors/entity-not-found.error'
import { Category } from '../../../../category/domain/entities/category'
import { CategoryInMemoryRepository } from '../../../infra/repositories/category-in-memory.repository'
import { FindCategoryByIdUseCase } from './find-category-by-id.usecase'

describe('FindCategoryUseCase Unit Tests', () => {
  let findCategoryUseCase: FindCategoryByIdUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    findCategoryUseCase = new FindCategoryByIdUseCase(repository)
  })

  it('should throw EntityNotFoundError when entity is not found', async () => {
    expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(EntityNotFoundError)
  })

  it('should find a category by id', async () => {
    const findByIdSpy = jest.spyOn(repository, 'findById')

    expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(EntityNotFoundError)
    expect(findByIdSpy).toHaveBeenCalledTimes(1)

    await repository.insert(new Category({ name: 'any_name' }))
    const createdCategory = repository.items[0]
    const foundCategory = await repository.findById(createdCategory.id)

    expect(findByIdSpy).toHaveBeenCalledTimes(2)
    expect(findByIdSpy).toHaveBeenLastCalledWith(createdCategory.id)
    expect(foundCategory).toStrictEqual(createdCategory)
  })
})
