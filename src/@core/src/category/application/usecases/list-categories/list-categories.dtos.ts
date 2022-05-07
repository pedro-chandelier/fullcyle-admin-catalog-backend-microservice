import { CategoryRepository } from '#category/domain/repositories/category.repository'
import { SearchInputDTO } from '#seedwork/application/dtos/search-input.dto'
import { SearchOutputDTO } from '#seedwork/application/dtos/search-output.dto'

import { CategoryOutput } from '../@shared/dtos/category.dtos'

export type ListCategoriesInput = SearchInputDTO<CategoryRepository.Filter>

export type ListCategoriesOutput = SearchOutputDTO<CategoryOutput>
