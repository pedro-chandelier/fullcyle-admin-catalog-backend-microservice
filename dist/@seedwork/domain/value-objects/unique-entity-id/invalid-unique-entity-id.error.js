"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidUniqueEntityIdError = void 0;
class InvalidUniqueEntityIdError extends Error {
    constructor() {
        super('EntityId must be a valid uuid');
        this.name = 'InvalidUniqueEntityIdError';
    }
}
exports.InvalidUniqueEntityIdError = InvalidUniqueEntityIdError;
