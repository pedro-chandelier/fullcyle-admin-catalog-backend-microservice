"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_validator_1 = require("./category.validator");
describe('CategoryValidator Tests', () => {
    const validator = category_validator_1.CategoryValidatorFactory.create();
    it('should invalidate name field', () => {
        expect({ validator, data: { name: null } }).toContainValidationErrorMessages({
            name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
        });
        expect({ validator, data: { name: undefined } }).toContainValidationErrorMessages({
            name: ['name should not be empty', 'name must be a string', 'name must be shorter than or equal to 255 characters']
        });
        expect({ validator, data: { name: '' } }).toContainValidationErrorMessages({
            name: ['name should not be empty']
        });
        expect({ validator, data: { name: true } }).toContainValidationErrorMessages({
            name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
        });
        expect({ validator, data: { name: {} } }).toContainValidationErrorMessages({
            name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
        });
        expect({ validator, data: { name: [] } }).toContainValidationErrorMessages({
            name: ['name must be a string', 'name must be shorter than or equal to 255 characters']
        });
        expect({ validator, data: { name: 'l'.repeat(256) } }).toContainValidationErrorMessages({
            name: ['name must be shorter than or equal to 255 characters']
        });
    });
    it('should validate name field successfully', () => {
        const validScenarios = [
            { name: 'any_name' },
            { name: 'any_name', description: null },
            { name: 'any_name', description: undefined },
            { name: 'any_name', isActive: true },
            { name: 'any_name', isActive: false }
        ];
        validScenarios.forEach(scenario => {
            expect(validator.validate(scenario)).toBeTruthy();
            expect(validator.validatedData).toStrictEqual(new category_validator_1.CategoryRules(scenario));
        });
    });
});
