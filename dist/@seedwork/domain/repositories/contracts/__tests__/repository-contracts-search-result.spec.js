"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_contracts_search_result_1 = require("../repository-contracts-search-result");
describe('SearchResult Unit Tests', () => {
    test('constructor props', () => {
        let result = new repository_contracts_search_result_1.SearchResult({
            items: ['entity_1', 'entity_2'],
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null
        });
        expect(result.toJSON()).toStrictEqual({
            items: ['entity_1', 'entity_2'],
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: null,
            sort_dir: null,
            filter: null,
            last_page: 2
        });
        result = new repository_contracts_search_result_1.SearchResult({
            items: ['entity_1', 'entity_2'],
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test'
        });
        expect(result.toJSON()).toStrictEqual({
            items: ['entity_1', 'entity_2'],
            total: 4,
            current_page: 1,
            per_page: 2,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test',
            last_page: 2
        });
    });
    it('should set last_page = 1 when per_page is greater than total field', () => {
        const result = new repository_contracts_search_result_1.SearchResult({
            items: [],
            total: 4,
            current_page: 1,
            per_page: 15,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test'
        });
        expect(result.last_page).toBe(1);
    });
    it('should calculate last_page correctly', () => {
        const result = new repository_contracts_search_result_1.SearchResult({
            items: [],
            total: 101,
            current_page: 1,
            per_page: 20,
            sort: 'name',
            sort_dir: 'asc',
            filter: 'test'
        });
        expect(result.last_page).toBe(6);
    });
});
