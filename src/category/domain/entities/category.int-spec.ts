import { Category } from './category'

describe('Category Integration Tests', () => {
  describe('create category tests', () => {
    it('should throw when invalid category name is specified', () => {
      expect(() => new Category({ name: null })).toContainValidationErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => new Category({ name: undefined })).toContainValidationErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => new Category({ name: '' })).toContainValidationErrorMessages({ name: ['name should not be empty'] })

      expect(() => new Category({ name: 5 as any })).toContainValidationErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => new Category({ name: true as any })).toContainValidationErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => new Category({ name: 'l'.repeat(256) })).toContainValidationErrorMessages({
        name: ['name must be shorter than or equal to 255 characters']
      })
    })

    it('should throw when invalid category description is specified', () => {
      expect(() => new Category({ name: 'any_name', description: 5 as any }))
        .toContainValidationErrorMessages({
          description: ['description must be a string']
        })

      expect(() => new Category({ name: 'any_name', description: true as any }))
        .toContainValidationErrorMessages({
          description: ['description must be a string']
        })
    })

    it('should throw when invalid category is_active is specified', () => {
      expect(() => new Category({ name: 'any_name', is_active: 1 as any }))
        .toContainValidationErrorMessages({
          is_active: ['is_active must be a boolean value']
        })

      expect(() => new Category({ name: 'any_name', is_active: '' as any }))
        .toContainValidationErrorMessages({
          is_active: ['is_active must be a boolean value']
        })
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
      expect(() => category.update(null, 'any_description')).toContainValidationErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.update(undefined, 'any_description')).toContainValidationErrorMessages({
        name: [
          'name should not be empty',
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.update('', 'any_description')).toContainValidationErrorMessages({
        name: ['name should not be empty']
      })

      expect(() => category.update(5 as any, 'any_description')).toContainValidationErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.update(true as any, 'any_description')).toContainValidationErrorMessages({
        name: [
          'name must be a string',
          'name must be shorter than or equal to 255 characters'
        ]
      })

      expect(() => category.update('l'.repeat(256), 'any_description')).toContainValidationErrorMessages({
        name: ['name must be shorter than or equal to 255 characters']
      })
    })

    it('should throw when invalid category description is specified', () => {
      expect(() => category.update('any_name', 5 as any)).toContainValidationErrorMessages({
        description: ['description must be a string']
      })

      expect(() => category.update('any_name', true as any)).toContainValidationErrorMessages({
        description: ['description must be a string']
      })
    })

    it('should update the category successfully', () => {
      category.update('updated_name', 'updated_description')
      expect(category.name).toBe('updated_name')
      expect(category.description).toBe('updated_description')
    })
  })
})
