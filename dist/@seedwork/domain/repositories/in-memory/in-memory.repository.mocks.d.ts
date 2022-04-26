import { Entity } from '../../entities/entity';
import { InMemoryRepository } from './in-memory.repository';
export declare type EntityPropsStub = {
    name: string;
    price: number;
};
export declare class EntityStub extends Entity<EntityPropsStub> {
}
export declare class InMemoryRepositoryStub extends InMemoryRepository<EntityStub> {
}
