export declare class RulesValidator {
    private value;
    private readonly property;
    private constructor();
    static validate(value: any, property: string): RulesValidator;
    required(): Omit<this, 'required'>;
    string(): Omit<this, 'string'>;
    maxLength(length: number): Omit<this, 'maxLength'>;
    boolean(): Omit<this, 'boolean'>;
    private isEmpty;
}
