"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_in_memory_repository_1 = require("../../../../infra/repositories/category-in-memory.repository");
const create_category_usecase_1 = require("../create-category.usecase");
describe('CreateCategoryUseCase Unit Tests', () => {
    let usecase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        usecase = new create_category_usecase_1.CreateCategoryUseCase(repository);
    });
    it('should create a new category', async () => {
        const insertSpy = jest.spyOn(repository, 'insert');
        let output = await usecase.execute({ name: 'any_category' });
        expect(insertSpy).toHaveBeenCalledTimes(1);
        expect(repository.items.length).toBe(1);
        expect(repository.items[0].id).toBe(output.id);
        expect(repository.items[0].name).toBe('any_category');
        expect(repository.items[0].description).toBe(null);
        expect(repository.items[0].isActive).toBe(true);
        output = await usecase.execute({ name: 'any_category', description: 'any_description', isActive: false });
        expect(insertSpy).toHaveBeenCalledTimes(2);
        expect(repository.items.length).toBe(2);
        expect(repository.items[1].id).toBe(output.id);
        expect(repository.items[1].name).toBe('any_category');
        expect(repository.items[1].description).toBe('any_description');
        expect(repository.items[1].isActive).toBe(false);
    });
});
