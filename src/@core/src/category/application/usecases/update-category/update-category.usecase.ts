import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase } from '#seedwork/application/usecase'

import { CategoryOutputMapper } from '../@shared/category.mapper'
import { UpdateCategoryInput, UpdateCategoryOutput } from './update-category.dtos'

export class UpdateCategoryUseCase implements UseCase<UpdateCategoryInput, UpdateCategoryOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute({ id, name, description, isActive }: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.repository.findById(id)
    category.update(name, description)

    if (isActive === true) {
      category.activate()
    }

    if (isActive === false) {
      category.deactivate()
    }

    await this.repository.update(category)
    return CategoryOutputMapper.toOutput(category)
  }
}
