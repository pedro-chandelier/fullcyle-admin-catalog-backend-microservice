"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCategoryUseCase = void 0;
const category_1 = require("../../../domain/entities/category");
const category_mapper_1 = require("../@shared/category.mapper");
class CreateCategoryUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const category = new category_1.Category(input);
        await this.repository.insert(category);
        return category_mapper_1.CategoryOutputMapper.toOutput(category);
    }
}
exports.CreateCategoryUseCase = CreateCategoryUseCase;
