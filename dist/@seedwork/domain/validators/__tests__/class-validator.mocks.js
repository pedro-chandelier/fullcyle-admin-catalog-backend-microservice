"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassValidatorStub = exports.RulesStub = void 0;
const class_validator_1 = require("class-validator");
const class_validator_2 = require("../class-validator");
class RulesStub {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)()
], RulesStub.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)()
], RulesStub.prototype, "price", void 0);
exports.RulesStub = RulesStub;
class ClassValidatorStub extends class_validator_2.ClassValidator {
    validate(data) {
        return super.validate(new RulesStub(data));
    }
}
exports.ClassValidatorStub = ClassValidatorStub;
