import { Category } from './category'
import { ValidationError } from '../../../@seedwork/validators/errors/validation.error'

describe('Category Integration Tests', () => {
  describe('create category tests', () => {
    it('should throw when invalid category name is specified', () => {
      expect(() => new Category({ name: null })).toThrowError(new ValidationError('"name" is required'))
      expect(() => new Category({ name: undefined })).toThrowError(new ValidationError('"name" is required'))
      expect(() => new Category({ name: '' })).toThrowError(new ValidationError('"name" is required'))
      expect(() => new Category({ name: 5 as any })).toThrowError(new ValidationError('"name" must be a string'))
      expect(() => new Category({ name: true as any })).toThrowError(new ValidationError('"name" must be a string'))
      expect(() => new Category({ name: 'l'.repeat(256) })).toThrowError(new ValidationError('"name" length must be less than or equal to 255'))
    })

    it('should throw when invalid category description is specified', () => {
      expect(() => new Category({ name: 'any_name', description: 5 as any }))
        .toThrowError(new ValidationError('"description" must be a string'))

      expect(() => new Category({ name: 'any_name', description: true as any }))
        .toThrowError(new ValidationError('"description" must be a string'))
    })

    it('should throw when invalid category is_active is specified', () => {
      expect(() => new Category({ name: 'any_name', is_active: 1 as any }))
        .toThrowError(new ValidationError('"is_active" must be a boolean'))

      expect(() => new Category({ name: 'any_name', is_active: '' as any }))
        .toThrowError(new ValidationError('"is_active" must be a boolean'))
    })

    it('should create a valid category', () => {
      expect(() => {
        new Category({ name: 'any_name' }) // NOSONAR
        new Category({ name: 'any_name', description: null }) // NOSONAR
        new Category({ name: 'any_name', description: 'any_description' }) // NOSONAR
        new Category({ name: 'any_name', description: 'any_description', is_active: true }) // NOSONAR
        new Category({ name: 'any_name', description: 'any_description', is_active: false }) // NOSONAR
      }).not.toThrow()
    })
  })

  describe('update category tests', () => {
    const category = new Category({ name: 'any_name', description: 'any_description' })

    it('should throw when invalid category name is specified', () => {
      expect(() => category.update(null, 'any_description')).toThrowError(new ValidationError('"name" is required'))
      expect(() => category.update(undefined, 'any_description')).toThrowError(new ValidationError('"name" is required'))
      expect(() => category.update('', 'any_description')).toThrowError(new ValidationError('"name" is required'))
      expect(() => category.update(5 as any, 'any_description')).toThrowError(new ValidationError('"name" must be a string'))
      expect(() => category.update(true as any, 'any_description')).toThrowError(new ValidationError('"name" must be a string'))
      expect(() => category.update('l'.repeat(256), 'any_description')).toThrowError(new ValidationError('"name" length must be less than or equal to 255'))
    })

    it('should throw when invalid category description is specified', () => {
      expect(() => category.update('any_name', 5 as any)).toThrowError(new ValidationError('"description" must be a string'))
      expect(() => category.update('any_name', true as any)).toThrowError(new ValidationError('"description" must be a string'))
    })

    it('should update the category successfully', () => {
      category.update('updated_name', 'updated_description')
      expect(category.name).toBe('updated_name')
      expect(category.description).toBe('updated_description')
    })
  })
})
