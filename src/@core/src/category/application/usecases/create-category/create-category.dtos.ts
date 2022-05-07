import { CategoryOutput } from '../@shared/dtos/category.dtos'

export type CreateCategoryInput = {
  name: string
  description?: string
  isActive?: boolean
}

export type CreateCategoryOutput = CategoryOutput
