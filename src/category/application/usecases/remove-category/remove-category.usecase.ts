import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase } from '#seedwork/application/usecase'

import { RemoveCategoryInput } from './remove-category.dtos'

export class RemoveCategoryUseCase implements UseCase<RemoveCategoryInput, void> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: RemoveCategoryInput): Promise<void> {
    const category = await this.repository.findById(input)
    await this.repository.remove(category.id)
  }
}
