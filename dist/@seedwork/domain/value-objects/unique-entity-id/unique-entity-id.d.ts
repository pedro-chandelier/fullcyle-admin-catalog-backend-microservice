import { ValueObject } from '../value-object';
export declare class UniqueEntityId extends ValueObject<string> {
    readonly _id?: string;
    constructor(_id?: string);
    get id(): string;
    private validateId;
}
