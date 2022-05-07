import { CategoryOutputMapper } from '#category/application/usecases/@shared'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase as IUseCase } from '#seedwork/application/usecase'

import { CategoryOutput } from '../@shared/dtos/category.dtos'

export namespace FindCategoryByIdUseCase {
  export type Input = string

  export type Output = CategoryOutput
  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const category = await this.repository.findById(input)
      return CategoryOutputMapper.toOutput(category)
    }
  }
}
