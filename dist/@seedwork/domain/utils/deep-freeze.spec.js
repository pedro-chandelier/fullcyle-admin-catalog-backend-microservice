"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deep_freeze_1 = require("./deep-freeze");
describe('deepFreeze', () => {
    it('should not freeze a scalar value', () => {
        expect(typeof (0, deep_freeze_1.deepFreeze)(true)).toBe('boolean');
        expect(typeof (0, deep_freeze_1.deepFreeze)(false)).toBe('boolean');
        expect(typeof (0, deep_freeze_1.deepFreeze)('any_string')).toBe('string');
        expect(typeof (0, deep_freeze_1.deepFreeze)(10)).toBe('number');
        expect((0, deep_freeze_1.deepFreeze)(true)).toBe(true);
        expect((0, deep_freeze_1.deepFreeze)(false)).toBe(false);
        expect((0, deep_freeze_1.deepFreeze)('any_string')).toBe('any_string');
        expect((0, deep_freeze_1.deepFreeze)(10)).toBe(10);
    });
    it('should make a nested object immutable', () => {
        const immutable = (0, deep_freeze_1.deepFreeze)({
            prop_1: 'value_1',
            nested: {
                prop_2: true,
                prop_3: new Date()
            }
        });
        expect(() => {
            immutable.nested.prop_2 = false;
        }).toThrow();
        expect(() => {
            immutable.prop_1 = 'another_value';
        }).toThrow();
        expect(() => {
            immutable.nested.prop_3 = new Date();
        }).toThrow();
        expect(immutable.prop_1).toBe('value_1');
        expect(immutable.nested.prop_2).toBe(true);
        expect(immutable.nested.prop_3).toBeInstanceOf(Date);
    });
});
