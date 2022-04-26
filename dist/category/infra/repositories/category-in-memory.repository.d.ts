import { SortDirection } from "../../../@seedwork/domain/repositories/contracts/repository-contracts-search-params";
import { InMemorySearchableRepository } from '../../../@seedwork/domain/repositories/in-memory/in-memory.repository';
import { Category } from '../../domain/entities/category';
import { CategoryRepository } from '../../domain/repositories/category.repository';
export declare class CategoryInMemoryRepository extends InMemorySearchableRepository<Category> implements CategoryRepository.Repository {
    sortableFields: string[];
    protected applyFilter(items: Category[], filter: CategoryRepository.Filter | null): Promise<Category[]>;
    protected applySort(items: Category[], sort: string | null, sortDir: SortDirection | null): Promise<Category[]>;
}
