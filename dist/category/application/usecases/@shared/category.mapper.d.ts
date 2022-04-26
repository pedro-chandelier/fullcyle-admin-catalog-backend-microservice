import { Category } from '../../../domain/entities/category';
import { CategoryOutput } from './dtos/category.dtos';
export declare class CategoryOutputMapper {
    static toOutput(entity: Category): CategoryOutput;
}
