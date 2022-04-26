"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("#seedwork/domain/value-objects/unique-entity-id/unique-entity-id");
const category_1 = require("./category");
describe('Category Unit Tests', () => {
    // isolating Category.validate so that it does not affect unit tests
    category_1.Category.validate = jest.fn(() => { });
    it('should create with correct values', () => {
        const creationDate = new Date();
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description',
            isActive: true,
            createdAt: creationDate
        });
        expect(category_1.Category.validate).toHaveBeenCalledTimes(1);
        expect(category.id).toBe('123e4567-e89b-12d3-a456-426614174000');
        expect(category.name).toBe('any_name');
        expect(category.description).toBe('any_description');
        expect(category.isActive).toBe(true);
        expect(category.createdAt).toBe(creationDate);
    });
    it('should throw when invalid id is specified', () => {
        expect(() => {
            const _ = new category_1.Category({ id: new unique_entity_id_1.UniqueEntityId('invalid_id'), name: 'any_name' });
        }).toThrow();
    });
    it('should create with correct values when optional values are ommited', () => {
        var _a;
        const dateBeforeCreating = new Date('2020-01-01');
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description',
            isActive: false
        });
        expect(category_1.Category.validate).toHaveBeenCalledTimes(1);
        expect(category.id).toBeDefined();
        expect(category.name).toBe('any_name');
        expect(category.description).toBe('any_description');
        expect(category.isActive).toBe(false);
        expect(category.createdAt).toBeInstanceOf(Date);
        expect((_a = category.createdAt) === null || _a === void 0 ? void 0 : _a.getTime()).toBeGreaterThan(dateBeforeCreating.getTime());
    });
    it('should activate the category', () => {
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description',
            isActive: false
        });
        expect(category_1.Category.validate).toHaveBeenCalledTimes(1);
        expect(category.isActive).toBe(false);
        category.activate();
        expect(category.isActive).toBe(true);
    });
    it('should deactivate the category', () => {
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description',
            isActive: true
        });
        expect(category_1.Category.validate).toHaveBeenCalledTimes(1);
        expect(category.isActive).toBe(true);
        category.deactivate();
        expect(category.isActive).toBe(false);
    });
    it('should return the correct values when gettters are invoked', () => {
        const createdAt = new Date();
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description',
            isActive: true,
            createdAt: createdAt
        });
        expect(category_1.Category.validate).toHaveBeenCalledTimes(1);
        expect(category.createdAt).toEqual(createdAt);
        expect(category.name).toBe('any_name');
        expect(category.description).toBe('any_description');
    });
    it('should update a category', () => {
        const category = new category_1.Category({
            id: new unique_entity_id_1.UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
            name: 'any_name',
            description: 'any_description'
        });
        category.update('updated_name', 'updated_description');
        expect(category_1.Category.validate).toHaveBeenCalledTimes(2);
        expect(category.name).toBe('updated_name');
        expect(category.description).toBe('updated_description');
    });
});
