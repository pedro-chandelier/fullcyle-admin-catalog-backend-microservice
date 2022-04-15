import { Category } from '../../../domain/entities/category'
import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { CategoryOutput } from '../@shared/dtos/category.dtos'
import { CreateCategoryInput } from './create-category.dtos'

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: CreateCategoryInput): Promise<CategoryOutput> {
    const category = new Category(input)
    await this.repository.insert(category)
    return {
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      isActive: category.isActive
    }
  }
}
