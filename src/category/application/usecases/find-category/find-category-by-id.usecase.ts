import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { CategoryOutput } from '../@shared/dtos/category.dtos'
import { FindCategoryByIdInput } from './find-category-by-id.dtos'

export class FindCategoryByIdUseCase {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: FindCategoryByIdInput): Promise<CategoryOutput> {
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
