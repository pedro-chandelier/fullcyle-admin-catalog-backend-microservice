"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FindCategoryByIdUseCase = void 0;
const category_mapper_1 = require("../@shared/category.mapper");
class FindCategoryByIdUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const category = await this.repository.findById(input);
        return category_mapper_1.CategoryOutputMapper.toOutput(category);
    }
}
exports.FindCategoryByIdUseCase = FindCategoryByIdUseCase;
