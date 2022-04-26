import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';
export declare abstract class Entity<Props = any> {
    readonly props: Props;
    readonly uniqueEntityId: UniqueEntityId;
    constructor(props: Props);
    get id(): string;
    toJSON(): Required<{
        id: string;
    } & Props>;
}
