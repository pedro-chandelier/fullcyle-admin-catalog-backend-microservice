import { SearchableRepositoryInterface } from '../../../@seedwork/domain/repositories/contracts/repository-contracts.interface'
import { Category } from '../entities/category'

export interface CategoryRepository extends SearchableRepositoryInterface<Category, any, any> {}
