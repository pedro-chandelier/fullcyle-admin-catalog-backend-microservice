"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const repository_contracts_search_result_1 = require("../../../@seedwork/domain/repositories/contracts/repository-contracts-search-result");
const repository_contracts_search_params_1 = require("../../../@seedwork/domain/repositories/contracts/repository-contracts-search-params");
var CategoryRepository;
(function (CategoryRepository) {
    class SearchParams extends repository_contracts_search_params_1.SearchParams {
    }
    CategoryRepository.SearchParams = SearchParams;
    class SearchResult extends repository_contracts_search_result_1.SearchResult {
    }
    CategoryRepository.SearchResult = SearchResult;
})(CategoryRepository = exports.CategoryRepository || (exports.CategoryRepository = {}));
