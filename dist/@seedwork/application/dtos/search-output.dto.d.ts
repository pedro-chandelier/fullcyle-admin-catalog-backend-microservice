export declare type SearchOutputDTO<Item = any> = {
    items: Item[];
    total: number;
    current_page: number;
    last_page: number;
    per_page: number;
};
