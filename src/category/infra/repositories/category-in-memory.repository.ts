import { InMemorySearchableRepository } from '../../../@seedwork/domain/repositories/in-memory/in-memory.repository'
import { Category } from '../../domain/entities/category'
import { CategoryRepository } from '../../domain/repositories/category.repository'

export class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository {}
