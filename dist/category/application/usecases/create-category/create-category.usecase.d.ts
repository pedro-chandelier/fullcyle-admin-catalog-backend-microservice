import { UseCase } from '../../../../@seedwork/application/usecase';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { CreateCategoryInput, CreateCategoryOutput } from './create-category.dtos';
export declare class CreateCategoryUseCase implements UseCase<CreateCategoryInput, CreateCategoryOutput> {
    private readonly repository;
    constructor(repository: CategoryRepository.Repository);
    execute(input: CreateCategoryInput): Promise<CreateCategoryOutput>;
}
