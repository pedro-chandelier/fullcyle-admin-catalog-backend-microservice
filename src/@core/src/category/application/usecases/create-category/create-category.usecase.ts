import { Category } from '#category/domain/entities/category'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase } from '#seedwork/application/usecase'

import { CategoryOutputMapper } from '../@shared/category.mapper'
import { CreateCategoryInput, CreateCategoryOutput } from './create-category.dtos'

export class CreateCategoryUseCase implements UseCase<CreateCategoryInput, CreateCategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category = new Category(input)
    await this.repository.insert(category)
    return CategoryOutputMapper.toOutput(category)
  }
}
