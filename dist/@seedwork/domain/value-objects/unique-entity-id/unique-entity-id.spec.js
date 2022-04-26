"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const invalid_unique_entity_id_error_1 = require("./invalid-unique-entity-id.error");
const unique_entity_id_1 = require("./unique-entity-id");
describe('EntityId', () => {
    it('should create an EntityId when valid id is specified', () => {
        const validId = (0, uuid_1.v4)();
        const entityId = new unique_entity_id_1.UniqueEntityId(validId);
        expect((0, uuid_1.validate)(entityId.value)).toBe(true);
        expect(entityId.value).toBe(validId);
    });
    it('should throw new invalid id is specfied', () => {
        expect(() => {
            new unique_entity_id_1.UniqueEntityId('invalid_uuid');
        }).toThrowError(invalid_unique_entity_id_error_1.InvalidUniqueEntityIdError);
    });
});
