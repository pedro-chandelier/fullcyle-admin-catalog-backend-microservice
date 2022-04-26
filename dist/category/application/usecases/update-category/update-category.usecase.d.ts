import { UseCase } from '../../../../@seedwork/application/usecase';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { UpdateCategoryInput, UpdateCategoryOutput } from './update-category.dtos';
export declare class UpdateCategoryUseCase implements UseCase<UpdateCategoryInput, UpdateCategoryOutput> {
    private readonly repository;
    constructor(repository: CategoryRepository.Repository);
    execute({ id, name, description, isActive }: UpdateCategoryInput): Promise<UpdateCategoryOutput>;
}
