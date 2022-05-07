import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { UseCase as IUseCase } from '#seedwork/application/usecase'

export namespace RemoveCategoryUseCase {
  export type Input = string

  export class UseCase implements IUseCase<Input, void> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<void> {
      const category = await this.repository.findById(input)
      await this.repository.remove(category.id)
    }
  }
}
