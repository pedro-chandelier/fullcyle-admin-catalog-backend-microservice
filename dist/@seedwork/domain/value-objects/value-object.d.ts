export declare abstract class ValueObject<Value = any> {
    protected readonly _value: Value;
    constructor(_value: Value);
    get value(): Value;
    toString: () => string;
    private stringifySomenthingThatIsNotAnObject;
}
