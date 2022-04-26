"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCategoryUseCase = void 0;
const category_mapper_1 = require("../@shared/category.mapper");
class UpdateCategoryUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute({ id, name, description, isActive }) {
        const category = await this.repository.findById(id);
        category.update(name, description);
        if (isActive === true) {
            category.activate();
        }
        if (isActive === false) {
            category.deactivate();
        }
        await this.repository.update(category);
        return category_mapper_1.CategoryOutputMapper.toOutput(category);
    }
}
exports.UpdateCategoryUseCase = UpdateCategoryUseCase;
