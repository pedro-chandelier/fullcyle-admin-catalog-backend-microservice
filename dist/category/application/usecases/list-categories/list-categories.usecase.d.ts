import { UseCase } from '../../../../@seedwork/application/usecase';
import { CategoryRepository } from '../../../domain/repositories/category.repository';
import { ListCategoriesInput, ListCategoriesOutput } from './list-categories.dtos';
export declare class ListCategoriesUseCase implements UseCase<ListCategoriesInput, ListCategoriesOutput> {
    private readonly repository;
    constructor(repository: CategoryRepository.Repository);
    execute(input: ListCategoriesInput): Promise<ListCategoriesOutput>;
    private toOutput;
}
