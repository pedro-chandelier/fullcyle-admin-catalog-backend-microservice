import { SearcheableRepositoryInterface } from '../../../@seedwork/domain/repositories/contracts/repository-contracts.interface'
import { Category } from '../entities/category'

export interface CategoryRepository extends SearcheableRepositoryInterface<Category, any, any> {}
