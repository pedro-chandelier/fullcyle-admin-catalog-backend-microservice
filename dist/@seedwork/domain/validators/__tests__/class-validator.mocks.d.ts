import { ClassValidator } from '../class-validator';
export declare class RulesStub {
    name: string;
    price: number;
    constructor(data: any);
}
export declare class ClassValidatorStub extends ClassValidator<RulesStub> {
    validate(data: any): boolean;
}
