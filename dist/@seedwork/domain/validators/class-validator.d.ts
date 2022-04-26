import { FieldsErrors, FieldsValidatorInterface } from './fields-validator.interface';
export declare abstract class ClassValidator<ValidatedProps> implements FieldsValidatorInterface<ValidatedProps> {
    errors: FieldsErrors;
    validatedData: ValidatedProps;
    validate(data: any): boolean;
    private aggregateErrorMessages;
}
