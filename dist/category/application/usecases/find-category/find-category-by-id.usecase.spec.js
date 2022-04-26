"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_not_found_error_1 = require("../../../../@seedwork/domain/repositories/errors/entity-not-found.error");
const category_1 = require("../../../../category/domain/entities/category");
const category_in_memory_repository_1 = require("../../../infra/repositories/category-in-memory.repository");
const find_category_by_id_usecase_1 = require("./find-category-by-id.usecase");
describe('FindCategoryUseCase Unit Tests', () => {
    let findCategoryUseCase;
    let repository;
    beforeEach(() => {
        repository = new category_in_memory_repository_1.CategoryInMemoryRepository();
        findCategoryUseCase = new find_category_by_id_usecase_1.FindCategoryByIdUseCase(repository);
    });
    it('should throw EntityNotFoundError when entity is not found', async () => {
        expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(entity_not_found_error_1.EntityNotFoundError);
    });
    it('should find a category by id', async () => {
        const findByIdSpy = jest.spyOn(repository, 'findById');
        expect(findCategoryUseCase.execute('unexisting_id')).rejects.toThrowError(entity_not_found_error_1.EntityNotFoundError);
        expect(findByIdSpy).toHaveBeenCalledTimes(1);
        await repository.insert(new category_1.Category({ name: 'any_name' }));
        const createdCategory = repository.items[0];
        const foundCategory = await repository.findById(createdCategory.id);
        expect(findByIdSpy).toHaveBeenCalledTimes(2);
        expect(findByIdSpy).toHaveBeenLastCalledWith(createdCategory.id);
        expect(foundCategory).toStrictEqual(createdCategory);
    });
});
