"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RulesValidator = void 0;
const validation_error_1 = require("./errors/validation.error");
class RulesValidator {
    constructor(value, property) {
        this.value = value;
        this.property = property;
    }
    static validate(value, property) {
        return new RulesValidator(value, property);
    }
    required() {
        if (this.value === null || this.value === undefined || this.value === '') {
            throw new validation_error_1.ValidationError(`"${this.property}" is required`);
        }
        return this;
    }
    string() {
        if (!this.isEmpty(this.value) && typeof this.value !== 'string') {
            throw new validation_error_1.ValidationError(`"${this.property}" must be a string`);
        }
        return this;
    }
    maxLength(length) {
        if (!this.isEmpty(this.value) && this.value.length > length) {
            throw new validation_error_1.ValidationError(`"${this.property}" length must be less than or equal to ${length}`);
        }
        return this;
    }
    boolean() {
        if (!this.isEmpty(this.value) && typeof this.value !== 'boolean') {
            throw new validation_error_1.ValidationError(`"${this.property}" must be a boolean`);
        }
        return this;
    }
    isEmpty(value) {
        return value === null || value === undefined;
    }
}
exports.RulesValidator = RulesValidator;
