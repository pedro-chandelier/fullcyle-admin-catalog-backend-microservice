export declare type SearchProps<Filter = string> = {
    page?: number;
    per_page?: number;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;
};
export declare type SortDirection = 'asc' | 'desc';
export declare class SearchParams<Filter = string> {
    protected _page: number;
    protected _per_page: number;
    protected _sort: string | null;
    protected _sort_dir: SortDirection | null;
    protected _filter: Filter | null;
    constructor(props?: SearchProps<Filter>);
    get page(): number;
    private set page(value);
    get per_page(): number;
    private set per_page(value);
    get sort(): string | null;
    private set sort(value);
    get sort_dir(): SortDirection | null;
    private set sort_dir(value);
    get filter(): Filter | null;
    private set filter(value);
}
