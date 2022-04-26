"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = require("expect");
expect.extend({
    toContainValidationErrorMessages
});
function toContainValidationErrorMessages(expected, received) {
    if (typeof expected === 'function') {
        return assertWhenExpectedIsFunction(expected, received);
    }
    const { validator, data } = expected;
    if (validator.validate(data)) {
        return isValid();
    }
    return assertContainsErrorMessages(received, validator.errors);
}
function isValid() {
    return { pass: false, message: () => 'The data is valid' };
}
function assertWhenExpectedIsFunction(expected, received) {
    try {
        expected();
        return isValid();
    }
    catch (e) {
        const error = e;
        return assertContainsErrorMessages(received, error.error);
    }
}
function assertContainsErrorMessages(received, errors) {
    const isMatch = (0, expect_1.objectContaining)(received).asymmetricMatch(errors);
    if (isMatch) {
        return success();
    }
    return failed(received, errors);
}
function success() {
    return { pass: true, message: () => '' };
}
function failed(received, errors) {
    return {
        pass: false,
        message: () => `Expected: "${JSON.stringify(received)}"\nReceived: "${JSON.stringify(errors)}"`
    };
}
