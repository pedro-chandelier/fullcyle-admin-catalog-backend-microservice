import { ClassValidator } from '../../../@seedwork/domain/validators/class-validator';
import { CategoryProperties } from '../entities/category';
export declare class CategoryRules {
    name: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    constructor({ name, description, isActive, createdAt }: CategoryProperties);
}
export declare class CategoryValidator extends ClassValidator<CategoryRules> {
    validate(data: CategoryProperties): boolean;
}
export declare class CategoryValidatorFactory {
    static create(): CategoryValidator;
}
