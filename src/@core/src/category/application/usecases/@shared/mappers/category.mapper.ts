import { Category } from '#category/domain/entities/category'
import { CategoryOutput } from '../dtos/category.dtos'

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON()
  }
}
