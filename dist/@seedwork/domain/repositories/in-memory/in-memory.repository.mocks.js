"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryRepositoryStub = exports.EntityStub = void 0;
const entity_1 = require("../../entities/entity");
const in_memory_repository_1 = require("./in-memory.repository");
class EntityStub extends entity_1.Entity {
}
exports.EntityStub = EntityStub;
class InMemoryRepositoryStub extends in_memory_repository_1.InMemoryRepository {
}
exports.InMemoryRepositoryStub = InMemoryRepositoryStub;
