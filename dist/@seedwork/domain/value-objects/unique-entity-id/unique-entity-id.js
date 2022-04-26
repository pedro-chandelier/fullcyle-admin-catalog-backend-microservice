"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityId = void 0;
const uuid_1 = require("uuid");
const value_object_1 = require("../value-object");
const invalid_unique_entity_id_error_1 = require("./invalid-unique-entity-id.error");
class UniqueEntityId extends value_object_1.ValueObject {
    constructor(_id) {
        super(_id || (0, uuid_1.v4)());
        this._id = _id;
        this.validateId(_id);
    }
    get id() {
        return super.value;
    }
    validateId(id) {
        if (id && !(0, uuid_1.validate)(id)) {
            throw new invalid_unique_entity_id_error_1.InvalidUniqueEntityIdError();
        }
    }
}
exports.UniqueEntityId = UniqueEntityId;
