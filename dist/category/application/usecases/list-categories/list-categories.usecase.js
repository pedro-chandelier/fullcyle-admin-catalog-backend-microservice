"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListCategoriesUseCase = void 0;
const search_output_mapper_1 = require("../../../../@seedwork/application/mappers/search-output.mapper");
const category_repository_1 = require("../../../domain/repositories/category.repository");
const category_mapper_1 = require("../@shared/category.mapper");
class ListCategoriesUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const params = new category_repository_1.CategoryRepository.SearchParams(input);
        const searchResult = await this.repository.search(params);
        return this.toOutput(searchResult);
    }
    toOutput(searchResult) {
        return Object.assign({ items: searchResult.items.map(category => category_mapper_1.CategoryOutputMapper.toOutput(category)) }, search_output_mapper_1.SearchResultMapper.toOutput(searchResult));
    }
}
exports.ListCategoriesUseCase = ListCategoriesUseCase;
