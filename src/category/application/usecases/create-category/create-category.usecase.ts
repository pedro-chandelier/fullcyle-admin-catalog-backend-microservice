import { UseCase } from '../../../../@seedwork/application/usecase'
import { Category } from '../../../domain/entities/category'
import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { CreateCategoryInput, CreateCategoryOutput } from './create-category.dtos'
import { CategoryOutputMapper } from '../@shared/category.mapper'

export class CreateCategoryUseCase implements UseCase<CreateCategoryInput, CreateCategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    const category = new Category(input)
    await this.repository.insert(category)
    return CategoryOutputMapper.toOutput(category)
  }
}
