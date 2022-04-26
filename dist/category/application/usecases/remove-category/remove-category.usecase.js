"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCategoryUseCase = void 0;
class RemoveCategoryUseCase {
    constructor(repository) {
        this.repository = repository;
    }
    async execute(input) {
        const category = await this.repository.findById(input);
        await this.repository.remove(category.id);
    }
}
exports.RemoveCategoryUseCase = RemoveCategoryUseCase;
