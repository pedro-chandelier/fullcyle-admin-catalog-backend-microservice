import { UseCase } from '../../../../@seedwork/application/usecase';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { FindCategoryByIdInput, FindCategoryByIdOutput } from './find-category-by-id.dtos';
export declare class FindCategoryByIdUseCase implements UseCase<FindCategoryByIdInput, FindCategoryByIdOutput> {
    private readonly repository;
    constructor(repository: CategoryRepository.Repository);
    execute(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput>;
}
