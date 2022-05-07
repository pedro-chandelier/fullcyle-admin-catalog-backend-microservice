import { CategoryOutputMapper } from '#category/application/usecases/@shared'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase as IUseCase } from '#seedwork/application/usecase'

import { CategoryOutput } from '../@shared/dtos/category.dtos'

export namespace UpdateCategoryUseCase {
  export type Input = {
    id: string
    name: string
    description?: string
    isActive?: boolean
  }

  export type Output = CategoryOutput

  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute({ id, name, description, isActive }: Input): Promise<Output> {
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
}
