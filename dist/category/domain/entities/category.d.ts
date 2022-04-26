import { Entity } from '../../../@seedwork/domain/entities/entity';
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id';
export declare class Category extends Entity<CategoryProperties> {
    readonly props: CategoryProperties;
    constructor(props: CategoryProperties);
    static validate(props: CategoryProperties): void;
    update(name: string, description: string): void;
    activate(): void;
    deactivate(): void;
    get isActive(): boolean;
    get name(): string;
    private set name(value);
    get description(): string;
    private set description(value);
    get createdAt(): Date;
}
export declare type CategoryProperties = {
    id?: UniqueEntityId;
    name: string;
    description?: string;
    isActive?: boolean;
    createdAt?: Date;
};
