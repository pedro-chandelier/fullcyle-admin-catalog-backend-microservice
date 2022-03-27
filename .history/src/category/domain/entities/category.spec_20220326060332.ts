import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'
import { Category } from './category'

describe('Category', () => {
  it.only('should create with correct values', () => {
    const creationDate = new Date()
    const category = new Category({
      id: new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
      name: 'any_name',
      description: 'any_description',
      is_active: true,
      created_at: creationDate
    })

    expect(category.id).toBe('123e4567-e89b-12d3-a456-426614174000')
    expect(category.name).toBe('any_name')
    expect(category.description).toBe('any_description')
    expect(category.isActive()).toBe(true)
    expect(category.createdAt).toBe(creationDate)
  })

  // it('should throw when invalid id is specified', () => {
  //   expect(() => {
  //     const _ = new Category({ id: new UniqueEntityId('invalid_id'), name: 'any_name' })
  //   }).toThrow()
  // })

  // it('should create with correct values when optional values are ommited', () => {
  //   const dateBeforeCreating = new Date('2020-01-01')
  //   const category = new Category({
  //     id: new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
  //     name: 'any_name',
  //     description: 'any_description',
  //     is_active: false
  //   })

  //   expect(category.id).toBeDefined()
  //   expect(category.name).toBe('any_name')
  //   expect(category.description).toBe('any_description')
  //   expect(category.isActive()).toBe(false)
  //   expect(category.createdAt).toBeInstanceOf(Date)
  //   expect(category.createdAt?.getTime()).toBeGreaterThan(dateBeforeCreating.getTime())
  // })

  // it('should activate the category', () => {
  //   const category = new Category({
  //     id: new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
  //     name: 'any_name',
  //     description: 'any_description',
  //     is_active: false
  //   })

  //   expect(category.isActive()).toBe(false)
  //   category.activate()
  //   expect(category.isActive()).toBe(true)
  // })

  // it('should deactivate the category', () => {
  //   const category = new Category({
  //     id: new UniqueEntityId('123e4567-e89b-12d3-a456-426614174000'),
  //     name: 'any_name',
  //     description: 'any_description',
  //     is_active: true
  //   })

  //   expect(category.isActive()).toBe(true)
  //   category.deactivate()
  //   expect(category.isActive()).toBe(false)
  // })
})
