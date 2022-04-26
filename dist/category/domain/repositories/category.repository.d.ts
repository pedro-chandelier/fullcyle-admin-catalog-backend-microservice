import { SearchableRepositoryInterface } from '../../../@seedwork/domain/repositories/contracts/repository-contracts.interface';
import { Category } from '../entities/category';
import { SearchResult as DefaultSearchResult } from '../../../@seedwork/domain/repositories/contracts/repository-contracts-search-result';
import { SearchParams as DefaultSearchParams } from '../../../@seedwork/domain/repositories/contracts/repository-contracts-search-params';
export declare namespace CategoryRepository {
    type Filter = string;
    class SearchParams extends DefaultSearchParams<Filter> {
    }
    class SearchResult extends DefaultSearchResult<Category, Filter> {
    }
    interface Repository extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResult> {
    }
}
