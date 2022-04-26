"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResultMapper = void 0;
class SearchResultMapper {
    static toOutput(result) {
        return {
            total: result.total,
            current_page: result.current_page,
            last_page: result.last_page,
            per_page: result.per_page
        };
    }
}
exports.SearchResultMapper = SearchResultMapper;
