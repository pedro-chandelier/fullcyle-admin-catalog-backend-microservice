import { Category } from '../../../domain/entities/category'
import { CategoryOutput } from './dtos/category.dtos'

export class CategoryOutputMapper {
  static toOutput(entity: Category): CategoryOutput {
    return entity.toJSON()
  }
}
