"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const classValidatorLib = __importStar(require("class-validator"));
const class_validator_mocks_1 = require("./class-validator.mocks");
describe('ClassValidator Unit Tests', () => {
    it('should initialize errors and validatedData nulled', () => {
        const validator = new class_validator_mocks_1.ClassValidatorStub();
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });
    it('should throw errors', () => {
        const validator = new class_validator_mocks_1.ClassValidatorStub();
        const validateSyncSpy = jest.spyOn(classValidatorLib, 'validateSync').mockReturnValue([
            {
                property: 'field',
                constraints: { isRequired: 'any_error' }
            }
        ]);
        expect(validator.validate(null)).toBeFalsy();
        expect(validateSyncSpy).toHaveBeenCalled();
        expect(validator.validatedData).toBe(null);
        expect(validator.errors).toStrictEqual({ field: ['any_error'] });
    });
    it('should validate successfully', () => {
        const validator = new class_validator_mocks_1.ClassValidatorStub();
        const validateSyncSpy = jest.spyOn(classValidatorLib, 'validateSync').mockReturnValue([]);
        expect(validator.validate({ name: 'value' })).toBeTruthy();
        expect(validateSyncSpy).toHaveBeenCalled();
        expect(validator.validatedData).toEqual({ name: 'value' });
        expect(validator.errors).toBeNull();
    });
});
