import { CategoryInMemoryRepository } from '#category/infra/repositories/category-in-memory.repository'
import { CreateCategoryUseCase } from './create-category.usecase'

describe('CreateCategoryUseCase Unit Tests', () => {
  let usecase: CreateCategoryUseCase.UseCase
  let repository: CategoryInMemoryRepository

  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    usecase = new CreateCategoryUseCase.UseCase(repository)
  })

  it('should create a new category', async () => {
    const insertSpy = jest.spyOn(repository, 'insert')
    let output = await usecase.execute({ name: 'any_category' })

    expect(insertSpy).toHaveBeenCalledTimes(1)
    expect(repository.items.length).toBe(1)
    expect(repository.items[0].id).toBe(output.id)
    expect(repository.items[0].name).toBe('any_category')
    expect(repository.items[0].description).toBe(null)
    expect(repository.items[0].isActive).toBe(true)

    output = await usecase.execute({ name: 'any_category', description: 'any_description', isActive: false })

    expect(insertSpy).toHaveBeenCalledTimes(2)
    expect(repository.items.length).toBe(2)
    expect(repository.items[1].id).toBe(output.id)
    expect(repository.items[1].name).toBe('any_category')
    expect(repository.items[1].description).toBe('any_description')
    expect(repository.items[1].isActive).toBe(false)
  })
})
