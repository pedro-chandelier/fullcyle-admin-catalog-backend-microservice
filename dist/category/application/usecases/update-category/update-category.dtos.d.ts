import { CategoryOutput } from '../@shared/dtos/category.dtos';
export declare type UpdateCategoryInput = {
    id: string;
    name: string;
    description?: string;
    isActive?: boolean;
};
export declare type UpdateCategoryOutput = CategoryOutput;
