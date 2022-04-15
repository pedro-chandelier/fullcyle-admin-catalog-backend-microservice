import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { FindCategoryByIdInput, FindCategoryByIdOutput } from './find-category-by-id.dtos'

export class FindCategoryByIdUseCase {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput> {
    const category = await this.repository.findById(input)
    return {
      id: input,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      isActive: category.isActive
    }
  }
}
