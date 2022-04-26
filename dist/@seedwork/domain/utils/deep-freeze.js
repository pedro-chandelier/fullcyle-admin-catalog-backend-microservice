"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepFreeze = void 0;
function deepFreeze(anObject) {
    if (!anObject || typeof anObject !== 'object')
        return anObject;
    const propertyNames = Object.getOwnPropertyNames(anObject);
    for (const name of propertyNames) {
        const value = anObject[name];
        if (value && typeof value === 'object') {
            deepFreeze(value);
        }
    }
    return Object.freeze(anObject);
}
exports.deepFreeze = deepFreeze;
