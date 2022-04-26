import { UseCase } from '../../../../@seedwork/application/usecase';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { RemoveCategoryInput } from './remove-category.dtos';
export declare class RemoveCategoryUseCase implements UseCase<RemoveCategoryInput, void> {
    private readonly repository;
    constructor(repository: CategoryRepository.Repository);
    execute(input: RemoveCategoryInput): Promise<void>;
}
