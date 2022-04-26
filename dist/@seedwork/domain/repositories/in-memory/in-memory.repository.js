"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySearchableRepository = exports.InMemoryRepository = void 0;
const repository_contracts_search_result_1 = require("./../contracts/repository-contracts-search-result");
const entity_not_found_error_1 = require("../errors/entity-not-found.error");
class InMemoryRepository {
    constructor() {
        this.items = [];
    }
    async findById(id) {
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll() {
        return this.items;
    }
    async insert(entity) {
        this.items.push(entity);
    }
    async update(entity) {
        await this._get(entity.id);
        const itemIndex = this.items.findIndex(({ id }) => id === entity.id);
        this.items[itemIndex] = entity;
    }
    async remove(id) {
        const _id = `${id}`;
        await this._get(_id);
        const itemIndex = this.items.findIndex(item => item.id === _id);
        this.items.splice(itemIndex, 1);
    }
    async _get(id) {
        const item = this.items.find(({ id: _id }) => _id === id);
        if (!item) {
            throw new entity_not_found_error_1.EntityNotFoundError(`Entity not found from ID ${id}`);
        }
        return item;
    }
}
exports.InMemoryRepository = InMemoryRepository;
class InMemorySearchableRepository extends InMemoryRepository {
    constructor() {
        super(...arguments);
        this.sortableFields = [];
    }
    async applySort(items, sort, sortDir) {
        if (!this.canSort(sort))
            return items;
        return items.slice(0).sort((a, b) => {
            if (a.props[sort] < b.props[sort]) {
                return sortDir === 'asc' ? -1 : 1;
            }
            if (a.props[sort] > b.props[sort]) {
                return sortDir === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    canSort(sort) {
        return sort && this.sortableFields.includes(sort);
    }
    applyPagination(items, page, itemsPerPage) {
        const start = (page - 1) * itemsPerPage;
        const limit = start + itemsPerPage;
        return Promise.resolve(items.slice(start, limit));
    }
    async search(props) {
        const filteredItems = await this.applyFilter(this.items, props.filter);
        const sortedItems = await this.applySort(filteredItems, props.sort, props.sort_dir);
        const paginatedItems = await this.applyPagination(sortedItems, props.page, props.per_page);
        return new repository_contracts_search_result_1.SearchResult({
            items: paginatedItems,
            total: filteredItems.length,
            current_page: props.page,
            per_page: props.per_page,
            sort: props.sort,
            sort_dir: props.sort_dir,
            filter: props.filter
        });
    }
}
exports.InMemorySearchableRepository = InMemorySearchableRepository;
