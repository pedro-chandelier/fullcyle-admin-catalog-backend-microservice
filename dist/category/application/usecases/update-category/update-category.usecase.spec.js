"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_not_found_error_1 = require("../../../../@seedwork/domain/repositories/errors/entity-not-found.error");
const category_1 = require("../../../domain/entities/category");
const category_in_memory_repository_1 = require("../../../infra/repositories/category-in-memory.repository");
const update_category_usecase_1 = require("./update-category.usecase");
describe('UpdateCategoryUseCase Unit Tests', () => {
    let usecase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        usecase = new update_category_usecase_1.UpdateCategoryUseCase(repository);
    });
    it('should throw EntityNotFoundError when entity is not found', async () => {
        expect(usecase.execute({ id: 'unexisting_id', name: 'any_name' })).rejects.toThrowError(entity_not_found_error_1.EntityNotFoundError);
    });
    it('should update a category', async () => {
        const updateSpy = jest.spyOn(repository, 'update');
        const category = new category_1.Category({ name: 'Movie' });
        repository.items = [category];
        let output = await usecase.execute({ id: category.id, name: 'any_category' });
        expect(updateSpy).toHaveBeenCalledTimes(1);
        expect(repository.items.length).toBe(1);
        expect(output).toStrictEqual({
            id: category.id,
            name: 'any_category',
            description: null,
            isActive: true,
            createdAt: category.createdAt
        });
        output = await usecase.execute({
            id: category.id,
            name: 'any_other_category',
            description: 'any_description',
            isActive: false
        });
        expect(updateSpy).toHaveBeenCalledTimes(2);
        expect(repository.items.length).toBe(1);
        expect(output).toStrictEqual({
            id: category.id,
            name: 'any_other_category',
            description: 'any_description',
            isActive: false,
            createdAt: category.createdAt
        });
    });
});
