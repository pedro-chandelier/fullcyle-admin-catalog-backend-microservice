"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResult = void 0;
class SearchResult {
    constructor(props) {
        this.items = props.items;
        this.total = props.total;
        this.current_page = props.current_page;
        this.per_page = props.per_page;
        this.last_page = Math.ceil(this.total / this.per_page);
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
    }
    toJSON() {
        return {
            items: this.items,
            total: this.total,
            current_page: this.current_page,
            per_page: this.per_page,
            last_page: this.last_page,
            sort: this.sort,
            sort_dir: this.sort_dir,
            filter: this.filter
        };
    }
}
exports.SearchResult = SearchResult;
