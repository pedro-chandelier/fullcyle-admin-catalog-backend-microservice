"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("./category");
describe('Category Integration Tests', () => {
    describe('create category tests', () => {
        it('should throw when invalid category name is specified', () => {
            expect(() => new category_1.Category({ name: null })).toContainValidationErrorMessages({
                name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => new category_1.Category({ name: undefined })).toContainValidationErrorMessages({
                name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => new category_1.Category({ name: '' })).toContainValidationErrorMessages({ name: ['name should not be empty'] });
            expect(() => new category_1.Category({ name: 5 })).toContainValidationErrorMessages({
                name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => new category_1.Category({ name: true })).toContainValidationErrorMessages({
                name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => new category_1.Category({ name: 'l'.repeat(256) })).toContainValidationErrorMessages({
                name: ['name must be shorter than or equal to 255 characters']
            });
        });
        it('should throw when invalid category description is specified', () => {
            expect(() => new category_1.Category({ name: 'any_name', description: 5 })).toContainValidationErrorMessages({
                description: ['description must be a string']
            });
            expect(() => new category_1.Category({ name: 'any_name', description: true })).toContainValidationErrorMessages({
                description: ['description must be a string']
            });
        });
        it('should throw when invalid category isActive is specified', () => {
            expect(() => new category_1.Category({ name: 'any_name', isActive: 1 })).toContainValidationErrorMessages({
                isActive: ['isActive must be a boolean value']
            });
            expect(() => new category_1.Category({ name: 'any_name', isActive: '' })).toContainValidationErrorMessages({
                isActive: ['isActive must be a boolean value']
            });
        });
        it('should create a valid category', () => {
            expect(() => {
                new category_1.Category({ name: 'any_name' }); // NOSONAR
                new category_1.Category({ name: 'any_name', description: null }); // NOSONAR
                new category_1.Category({ name: 'any_name', description: 'any_description' }); // NOSONAR
                new category_1.Category({ name: 'any_name', description: 'any_description', isActive: true }); // NOSONAR
                new category_1.Category({ name: 'any_name', description: 'any_description', isActive: false }); // NOSONAR
            }).not.toThrow();
        });
    });
    describe('update category tests', () => {
        const category = new category_1.Category({ name: 'any_name', description: 'any_description' });
        it('should throw when invalid category name is specified', () => {
            expect(() => category.update(null, 'any_description')).toContainValidationErrorMessages({
                name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => category.update(undefined, 'any_description')).toContainValidationErrorMessages({
                name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => category.update('', 'any_description')).toContainValidationErrorMessages({
                name: ['name should not be empty']
            });
            expect(() => category.update(5, 'any_description')).toContainValidationErrorMessages({
                name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => category.update(true, 'any_description')).toContainValidationErrorMessages({
                name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
            });
            expect(() => category.update('l'.repeat(256), 'any_description')).toContainValidationErrorMessages({
                name: ['name must be shorter than or equal to 255 characters']
            });
        });
        it('should throw when invalid category description is specified', () => {
            expect(() => category.update('any_name', 5)).toContainValidationErrorMessages({
                description: ['description must be a string']
            });
            expect(() => category.update('any_name', true)).toContainValidationErrorMessages({
                description: ['description must be a string']
            });
        });
        it('should update the category successfully', () => {
            category.update('updated_name', 'updated_description');
            expect(category.name).toBe('updated_name');
            expect(category.description).toBe('updated_description');
        });
    });
});
