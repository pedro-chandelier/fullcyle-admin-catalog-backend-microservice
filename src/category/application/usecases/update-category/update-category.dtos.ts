import { CategoryOutput } from '../@shared/dtos/category.dtos'

export type UpdateCategoryInput = {
  id: string
  name: string
  description?: string
  isActive?: boolean
}

export type UpdateCategoryOutput = CategoryOutput
