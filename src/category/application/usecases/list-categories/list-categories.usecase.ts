import { SearchResultMapper } from '../../../../@seedwork/application/mappers/search-output.mapper'
import { UseCase } from '../../../../@seedwork/application/usecase'
import { CategoryRepository } from '../../../domain/repositories/category.repository'
import { CategoryOutputMapper } from '../@shared/category.mapper'
import { ListCategoriesInput, ListCategoriesOutput } from './list-categories.dtos'

export class ListCategoriesUseCase implements UseCase<ListCategoriesInput, ListCategoriesOutput> {
  constructor(private readonly repository: CategoryRepository.Repository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategoryRepository.SearchParams(input)
    const searchResult = await this.repository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): ListCategoriesOutput {
    return {
      items: searchResult.items.map(category => CategoryOutputMapper.toOutput(category)),
      ...SearchResultMapper.toOutput(searchResult)
    }
  }
}
