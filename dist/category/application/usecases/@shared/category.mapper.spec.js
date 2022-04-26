"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_1 = require("../../../domain/entities/category");
const category_mapper_1 = require("./category.mapper");
const unique_entity_id_1 = require("../../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id");
describe('CategoryOutputMapper Unit Tests', () => {
    it('should convert a category into output', () => {
        const id = new unique_entity_id_1.UniqueEntityId();
        const category = new category_1.Category({
            id,
            name: 'any_name',
            createdAt: new Date('2022-01-01'),
            description: 'any_description',
            isActive: true
        });
        const toJSONSpy = jest.spyOn(category, 'toJSON');
        const output = category_mapper_1.CategoryOutputMapper.toOutput(category);
        expect(toJSONSpy).toHaveBeenCalledTimes(1);
        expect(output).toStrictEqual({
            id,
            name: 'any_name',
            createdAt: new Date('2022-01-01'),
            description: 'any_description',
            isActive: true
        });
    });
});
