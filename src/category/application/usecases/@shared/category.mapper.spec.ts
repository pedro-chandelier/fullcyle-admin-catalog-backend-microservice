import { Category } from '../../../domain/entities/category'
import { CategoryOutputMapper } from './category.mapper'
import { UniqueEntityId } from '../../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'

describe('CategoryOutputMapper Unit Tests', () => {
  it('should convert a category into output', () => {
    const id = new UniqueEntityId()
    const category = new Category({
      id,
      name: 'any_name',
      createdAt: new Date('2022-01-01'),
      description: 'any_description',
      isActive: true
    })
    const toJSONSpy = jest.spyOn(category, 'toJSON')
    const output = CategoryOutputMapper.toOutput(category)

    expect(toJSONSpy).toHaveBeenCalledTimes(1)
    expect(output).toStrictEqual({
      id,
      name: 'any_name',
      createdAt: new Date('2022-01-01'),
      description: 'any_description',
      isActive: true
    })
  })
})
