"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValueObject = void 0;
const deep_freeze_1 = require("../utils/deep-freeze");
class ValueObject {
    constructor(_value) {
        this._value = _value;
        this.toString = () => {
            const val = this.value;
            if (typeof val !== 'object' || val === null) {
                return this.stringifySomenthingThatIsNotAnObject(val);
            }
            const valueString = val.toString();
            return valueString === '[object Object]' ? JSON.stringify(val, null, 2) : valueString;
        };
    }
    get value() {
        return (0, deep_freeze_1.deepFreeze)(this._value);
    }
    stringifySomenthingThatIsNotAnObject(anyValue) {
        try {
            return anyValue.toString();
        }
        catch (_) {
            return `${anyValue}`;
        }
    }
}
exports.ValueObject = ValueObject;
