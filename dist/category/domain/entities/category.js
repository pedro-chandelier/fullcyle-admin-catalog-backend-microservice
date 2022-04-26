"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const entity_1 = require("../../../@seedwork/domain/entities/entity");
const category_validator_1 = require("../validators/category.validator");
const entity_validation_error_1 = require("../../../@seedwork/domain/validators/errors/entity-validation.error");
class Category extends entity_1.Entity {
    constructor(props) {
        var _a, _b, _c;
        Category.validate(props);
        super(props);
        this.props = props;
        this.props.name = props.name;
        this.props.description = (_a = props.description) !== null && _a !== void 0 ? _a : null;
        this.props.createdAt = (_b = props.createdAt) !== null && _b !== void 0 ? _b : new Date();
        this.props.isActive = (_c = props.isActive) !== null && _c !== void 0 ? _c : true;
    }
    // static validate (props: Omit<CategoryProperties, 'createdAt'>): void {
    //   RulesValidator.validate(props.name, 'name').string().maxLength(255).required()
    //   RulesValidator.validate(props.description, 'description').string()
    //   RulesValidator.validate(props.isActive, 'isActive').boolean()
    // }
    static validate(props) {
        const validator = category_validator_1.CategoryValidatorFactory.create();
        if (!validator.validate(props)) {
            throw new entity_validation_error_1.EntityValidationError(validator.errors);
        }
    }
    update(name, description) {
        Category.validate({ name, description });
        this.name = name;
        this.description = description !== null && description !== void 0 ? description : null;
    }
    activate() {
        this.props.isActive = true;
    }
    deactivate() {
        this.props.isActive = false;
    }
    get isActive() {
        return !!this.props.isActive;
    }
    get name() {
        return this.props.name;
    }
    set name(value) {
        this.props.name = value;
    }
    get description() {
        return this.props.description;
    }
    set description(value) {
        this.props.description = value;
    }
    get createdAt() {
        return this.props.createdAt;
    }
}
exports.Category = Category;
