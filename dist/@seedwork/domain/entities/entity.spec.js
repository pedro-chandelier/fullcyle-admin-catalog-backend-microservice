"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unique_entity_id_1 = require("../value-objects/unique-entity-id/unique-entity-id");
const entity_1 = require("./entity");
const uuid_1 = require("uuid");
class EntityStub extends entity_1.Entity {
}
describe('Entity', () => {
    it('should set props and id', () => {
        const arrange = { prop1: 'prop1_value', prop2: 10 };
        const entity = new EntityStub(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityId).toBeInstanceOf(unique_entity_id_1.UniqueEntityId);
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it('should accept a valid uuid', () => {
        const uniqueEntityId = new unique_entity_id_1.UniqueEntityId();
        const arrange = { prop1: 'prop1_value', prop2: 10, id: uniqueEntityId };
        const entity = new EntityStub(arrange);
        expect(entity.id).toBe(uniqueEntityId.value);
    });
    it('should convert an entity to a javascript object', () => {
        const uniqueEntityId = new unique_entity_id_1.UniqueEntityId();
        const arrange = { prop1: 'prop1_value', prop2: 10, id: uniqueEntityId };
        const entity = new EntityStub(arrange);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id }, arrange));
    });
});
