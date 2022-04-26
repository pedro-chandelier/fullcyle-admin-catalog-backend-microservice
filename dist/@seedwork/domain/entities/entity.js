"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entity = void 0;
const unique_entity_id_1 = require("../value-objects/unique-entity-id/unique-entity-id");
class Entity {
    constructor(props) {
        this.props = props;
        this.uniqueEntityId = props.id || new unique_entity_id_1.UniqueEntityId();
    }
    get id() {
        return this.uniqueEntityId.value;
    }
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.Entity = Entity;
