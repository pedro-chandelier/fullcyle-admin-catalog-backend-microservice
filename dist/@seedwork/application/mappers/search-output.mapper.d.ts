import { SearchOutputDTO } from './../dtos/search-output.dto';
import { SearchResult } from "../../domain/repositories/contracts/repository-contracts-search-result";
export declare class SearchResultMapper {
    static toOutput(result: SearchResult): Omit<SearchOutputDTO, 'items'>;
}
