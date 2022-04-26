import { CategoryOutput } from '../@shared/dtos/category.dtos';
export declare type CreateCategoryInput = {
    name: string;
    description?: string;
    isActive?: boolean;
};
export declare type CreateCategoryOutput = CategoryOutput;
