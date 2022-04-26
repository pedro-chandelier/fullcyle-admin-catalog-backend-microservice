import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase } from '#seedwork/application/usecase'

import { CategoryOutputMapper } from '../@shared/category.mapper'
import { FindCategoryByIdInput, FindCategoryByIdOutput } from './find-category-by-id.dtos'

export class FindCategoryByIdUseCase implements UseCase<FindCategoryByIdInput, FindCategoryByIdOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput> {
    const category = await this.repository.findById(input)
    return CategoryOutputMapper.toOutput(category)
  }
}
