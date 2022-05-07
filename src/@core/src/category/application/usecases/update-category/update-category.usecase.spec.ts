import { Category } from '#category/domain/entities/category'
import { CategoryInMemoryRepository } from '#category/infra/repositories/category-in-memory.repository'
import { EntityNotFoundError } from '#seedwork/domain/repositories/errors/entity-not-found.error'

import { UpdateCategoryUseCase } from './update-category.usecase'

describe('UpdateCategoryUseCase Unit Tests', () => {
  let usecase: UpdateCategoryUseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    usecase = new UpdateCategoryUseCase(repository)
  })

  it('should throw EntityNotFoundError when entity is not found', async () => {
    expect(usecase.execute({ id: 'unexisting_id', name: 'any_name' })).rejects.toThrowError(EntityNotFoundError)
  })

  it('should update a category', async () => {
    const updateSpy = jest.spyOn(repository, 'update')
    const category = new Category({ name: 'Movie' })

    repository.items = [category]
    let output = await usecase.execute({ id: category.id, name: 'any_category' })

    expect(updateSpy).toHaveBeenCalledTimes(1)
    expect(repository.items.length).toBe(1)
    expect(output).toStrictEqual({
      id: category.id,
      name: 'any_category',
      description: null,
      isActive: true,
      createdAt: category.createdAt
    })

    output = await usecase.execute({
      id: category.id,
      name: 'any_other_category',
      description: 'any_description',
      isActive: false
    })

    expect(updateSpy).toHaveBeenCalledTimes(2)
    expect(repository.items.length).toBe(1)
    expect(output).toStrictEqual({
      id: category.id,
      name: 'any_other_category',
      description: 'any_description',
      isActive: false,
      createdAt: category.createdAt
    })
  })
})
