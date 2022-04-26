import { FieldsErrors } from '../fields-validator.interface';
export declare class EntityValidationError extends Error {
    error: FieldsErrors;
    constructor(error: FieldsErrors);
}
