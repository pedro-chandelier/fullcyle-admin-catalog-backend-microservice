import { CategoryOutputMapper } from '#category/application/usecases/@shared'
import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { SearchInputDTO, SearchOutputDTO } from '#seedwork/application'
import { SearchResultMapper } from '#seedwork/application/mappers/search-output.mapper'
import { UseCase as IUseCase } from '#seedwork/application/usecase'

import { CategoryOutput } from '../@shared/dtos/category.dtos'

export namespace ListCategoriesUseCase {
  export type Input = SearchInputDTO<CategoryRepository.Filter>

  export type Output = SearchOutputDTO<CategoryOutput>
  export class UseCase implements IUseCase<Input, Output> {
    constructor(private readonly repository: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input)
      const searchResult = await this.repository.search(params)
      return this.toOutput(searchResult)
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      return {
        items: searchResult.items.map(category => CategoryOutputMapper.toOutput(category)),
        ...SearchResultMapper.toOutput(searchResult)
      }
    }
  }
}
