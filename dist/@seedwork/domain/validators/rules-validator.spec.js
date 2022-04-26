"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validation_error_1 = require("./errors/validation.error");
const rules_validator_1 = require("./rules-validator");
function assertIsInvalid({ value, property, error, rule, params = [] }) {
    expect(() => {
        runRule({ value, property, rule, params });
    }).toThrowError(error);
}
function assertIsValid({ value, property, rule, params = [] }) {
    expect(() => {
        runRule({ value, property, rule, params });
    }).not.toThrow();
}
function runRule({ value, property, rule, params = [] }) {
    const validator = rules_validator_1.RulesValidator.validate(value, property);
    const method = validator[rule];
    method.apply(validator, params);
}
describe('ValidationRules', () => {
    describe('validate()', () => {
        it('should create a validator instance', () => {
            const validator = rules_validator_1.RulesValidator.validate('any_value', 'any_field');
            expect(validator).toBeInstanceOf(rules_validator_1.RulesValidator);
            expect(validator['value']).toBe('any_value');
            expect(validator['property']).toBe('any_field');
        });
    });
    describe('required()', () => {
        it('should validate required values', () => {
            const RULE = 'required';
            const arrangeInvalidScenarios = [
                { value: null, property: 'any_field', error: new validation_error_1.ValidationError('"any_field" is required') },
                { value: undefined, property: 'other_field', error: new validation_error_1.ValidationError('"other_field" is required') },
                { value: '', property: 'another_field', error: new validation_error_1.ValidationError('"another_field" is required') }
            ];
            arrangeInvalidScenarios.forEach(invalid => {
                assertIsInvalid({
                    value: invalid.value,
                    property: invalid.property,
                    error: invalid.error,
                    rule: RULE
                });
            });
            const arrangeValidScenarios = [
                { value: 'any_string', property: 'any_field' },
                { value: 1, property: 'any_field' },
                { value: true, property: 'any_field' },
                { value: false, property: 'any_field' },
                { value: new Date(), property: 'any_field' },
                { value: {}, property: 'any_field' },
                { value: [], property: 'any_field' },
                { value: [{ prop: '' }, 1, true, false, new Date()], property: 'any_field' }
            ];
            arrangeValidScenarios.forEach(valid => {
                assertIsValid({
                    value: valid.value,
                    property: valid.property,
                    rule: RULE
                });
            });
        });
    });
    describe('string()', () => {
        it('should validate string value', () => {
            const RULE = 'string';
            const expectedError = new validation_error_1.ValidationError(`"any_property" must be a string`);
            assertIsInvalid({ value: 11, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: true, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: false, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: [], property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: {}, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: new Date(), property: 'any_property', error: expectedError, rule: RULE });
            assertIsValid({ value: 'any_string', property: 'any_property', rule: RULE });
            assertIsValid({ value: null, property: 'any_property', rule: RULE });
            assertIsValid({ value: undefined, property: 'any_property', rule: RULE });
        });
    });
    describe('maxLength()', () => {
        it('should validate maxLength rule', () => {
            const RULE = 'maxLength';
            const arrangeInvalidScenarios = [
                {
                    value: '1234567',
                    property: 'any_property',
                    error: new validation_error_1.ValidationError(`"any_property" length must be less than or equal to 6`),
                    params: [6]
                },
                {
                    value: '12',
                    property: 'any_property',
                    error: new validation_error_1.ValidationError(`"any_property" length must be less than or equal to 1`),
                    params: [1]
                }
            ];
            arrangeInvalidScenarios.forEach(({ value, property, error, params }) => {
                assertIsInvalid({ value, property, error, rule: RULE, params });
            });
            assertIsValid({
                value: '12345',
                property: 'any_property',
                params: [5],
                rule: RULE
            });
        });
    });
    describe('boolean()', () => {
        it('should validate boolean value', () => {
            const RULE = 'boolean';
            const expectedError = new validation_error_1.ValidationError(`"any_property" must be a boolean`);
            assertIsInvalid({ value: 'any_string', property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: 11, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: [], property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: {}, property: 'any_property', error: expectedError, rule: RULE });
            assertIsInvalid({ value: new Date(), property: 'any_property', error: expectedError, rule: RULE });
            assertIsValid({ value: true, property: 'any_property', rule: RULE });
            assertIsValid({ value: false, property: 'any_property', rule: RULE });
        });
    });
    describe('multiple rules validation', () => {
        it('should validate multiple rules at the same time and throw when any of them are invalid', () => {
            let validator = rules_validator_1.RulesValidator.validate(null, 'any_field');
            expect(() => {
                validator.required().string();
            }).toThrowError('"any_field" is required');
            validator = rules_validator_1.RulesValidator.validate(5, 'any_field');
            expect(() => {
                validator.required().string().maxLength(255);
            }).toThrowError('"any_field" must be a string');
            validator = rules_validator_1.RulesValidator.validate('123456', 'any_field');
            expect(() => {
                validator.required().string().maxLength(5);
            }).toThrowError('"any_field" length must be less than or equal to 5');
            validator = rules_validator_1.RulesValidator.validate(5, 'any_field');
            expect(() => {
                validator.required().boolean();
            }).toThrowError('"any_field" must be a boolean');
        });
        it('should validate multiple rules and pass when all of them are correct', () => {
            let validator = rules_validator_1.RulesValidator.validate('test', 'any_field');
            expect(() => {
                validator.string().maxLength(4).required();
            }).not.toThrow();
            validator = rules_validator_1.RulesValidator.validate(false, 'any_field');
            expect(() => {
                validator.boolean().required();
            }).not.toThrow();
        });
    });
});
