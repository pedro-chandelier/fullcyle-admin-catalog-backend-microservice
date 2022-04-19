import { UseCase } from '../../../../@seedwork/application/usecase'
import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { FindCategoryByIdInput, FindCategoryByIdOutput } from './find-category-by-id.dtos'
import { CategoryOutputMapper } from '../@shared/category.mapper'

export class FindCategoryByIdUseCase implements UseCase<FindCategoryByIdInput, FindCategoryByIdOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput> {
    const category = await this.repository.findById(input)
    return CategoryOutputMapper.toOutput(category)
  }
}
