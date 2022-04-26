"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInMemoryRepository = void 0;
const in_memory_repository_1 = require("../../../@seedwork/domain/repositories/in-memory/in-memory.repository");
class CategoryInMemoryRepository extends in_memory_repository_1.InMemorySearchableRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = ['createdAt', 'name', 'description'];
    }
    async applyFilter(items, filter) {
        if (!filter)
            return items;
        return items.filter(e => {
            return e.props.name.toLowerCase().includes(filter.toLowerCase());
        });
    }
    async applySort(items, sort, sortDir) {
        return sort ? super.applySort(items, sort, sortDir) : super.applySort(items, 'createdAt', 'desc');
    }
}
exports.CategoryInMemoryRepository = CategoryInMemoryRepository;
