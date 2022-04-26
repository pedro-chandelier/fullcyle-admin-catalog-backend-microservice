import { Entity } from '../../../entities/entity';
import { InMemorySearchableRepository } from '../../in-memory/in-memory.repository';
declare type EntityPropsStub = {
    name: string;
    price: number;
};
export declare class EntityStub extends Entity<EntityPropsStub> {
}
export declare class InMemorySearchableRepositoryStub extends InMemorySearchableRepository<EntityStub> {
    sortableFields: string[];
    protected applyFilter(items: EntityStub[], filter: string): Promise<EntityStub[]>;
}
export {};
