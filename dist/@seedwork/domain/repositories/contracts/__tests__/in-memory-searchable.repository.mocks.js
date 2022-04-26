"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepositoryStub = exports.EntityStub = void 0;
const entity_1 = require("../../../entities/entity");
const in_memory_repository_1 = require("../../in-memory/in-memory.repository");
class EntityStub extends entity_1.Entity {
}
exports.EntityStub = EntityStub;
class InMemorySearchableRepositoryStub extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['name'];
    }
    applyFilter(items, filter) {
        if (!filter)
            return Promise.resolve(items);
        return Promise.resolve(items.filter(e => {
            return e.props.name.toLowerCase().includes(filter.toLowerCase()) || e.props.price.toString() === filter;
        }));
    }
}
exports.InMemorySearchableRepositoryStub = InMemorySearchableRepositoryStub;
