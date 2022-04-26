"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityValidationError = void 0;
class EntityValidationError extends Error {
    constructor(error) {
        super('Entity Validation Error');
        this.error = error;
        this.name = 'EntityValidationError';
    }
}
exports.EntityValidationError = EntityValidationError;
