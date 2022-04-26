"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_not_found_error_1 = require("../../../../@seedwork/domain/repositories/errors/entity-not-found.error");
const category_1 = require("../../../domain/entities/category");
const category_in_memory_repository_1 = require("../../../infra/repositories/category-in-memory.repository");
const find_category_by_id_usecase_1 = require("../find-category/find-category-by-id.usecase");
const remove_category_usecase_1 = require("./remove-category.usecase");
describe('FindCategoryUseCase Unit Tests', () => {
    let findCategoryUseCase;
    let removeCategoryUseCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        findCategoryUseCase = new find_category_by_id_usecase_1.FindCategoryByIdUseCase(repository);
        removeCategoryUseCase = new remove_category_usecase_1.RemoveCategoryUseCase(repository);
    });
    it('should throw EntityNotFoundError when specified category id not exists', async () => {
        expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(entity_not_found_error_1.EntityNotFoundError);
    });
    it('should remove a category by id', async () => {
        const category = new category_1.Category({ name: 'any_name' });
        repository.items = [category];
        const findByIdSpy = jest.spyOn(repository, 'findById');
        const removeSpy = jest.spyOn(repository, 'remove');
        const id = category.id;
        await removeCategoryUseCase.execute(id);
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        expect(findByIdSpy).toHaveBeenCalledWith(id);
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledWith(id);
        expect(repository.items).toEqual([]);
    });
});
