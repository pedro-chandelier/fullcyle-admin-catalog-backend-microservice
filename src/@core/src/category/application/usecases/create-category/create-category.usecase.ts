import { CategoryOutputMapper } from '#category/application/usecases/@shared'
import { Category } from '#category/domain/entities/category'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase as IUseCase } from '#seedwork/application/usecase'

import { CategoryOutput } from '../@shared/dtos/category.dtos'

export namespace CreateCategoryUseCase {
  export type Input = {
    name: string
    description?: string
    isActive?: boolean
  }

  export type Output = CategoryOutput

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const category = new Category(input)
      await this.repository.insert(category)
      return CategoryOutputMapper.toOutput(category)
    }
  }
}
