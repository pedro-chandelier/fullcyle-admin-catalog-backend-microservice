"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_search_result_1 = require("../../domain/repositories/contracts/repository-contracts-search-result");
const search_output_mapper_1 = require("./search-output.mapper");
describe('SearchResultMapper Unit Tests', () => {
    it('should convert a SearchResult into an output', () => {
        const result = new repository_contracts_search_result_1.SearchResult({
            items: ['fake'],
            current_page: 1,
            per_page: 1,
            total: 1,
            sort: 'name',
            sort_dir: 'desc',
            filter: 'fake'
        });
        const output = search_output_mapper_1.SearchResultMapper.toOutput(result);
        expect(output).toStrictEqual({
            current_page: 1,
            last_page: 1,
            per_page: 1,
            total: 1
        });
    });
});
