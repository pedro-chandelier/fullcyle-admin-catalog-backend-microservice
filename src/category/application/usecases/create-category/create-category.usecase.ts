import { CategoryRepository } from './../../../domain/repositories/category.repository'
import { Category } from '../../../domain/entities/category'
import { CreateCategoryInput, CreateCategoryOutput } from './create-category.dtos'

export class CreateCategoryUseCase {
  constructor(private readonly repository: CategoryRepository.Repository) {}
   
  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
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
