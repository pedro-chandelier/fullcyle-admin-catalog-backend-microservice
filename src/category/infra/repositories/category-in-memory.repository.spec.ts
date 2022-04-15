import { Category } from '../../domain/entities/category'
import { CategoryInMemoryRepository } from './category-in-memory.repository'

describe('CategoryInMemoryRepository Unit Tests', () => {
  const categories = [
    new Category({ name: 'cat_1', created_at: new Date('2022-01-01'), description: 'desc_cat_1' }),
    new Category({ name: 'cat_4', created_at: new Date('2022-01-04'), description: 'desc_cat_4' }),
    new Category({ name: 'CAT_5', created_at: new Date('2022-01-05'), description: 'desc_cat_5' }),
    new Category({ name: 'cat_3', created_at: new Date('2022-01-03'), description: 'desc_cat_3' }),
    new Category({ name: 'cat_2', created_at: new Date('2022-01-02'), description: 'desc_cat_2' })
  ]
  const repository = new CategoryInMemoryRepository()

  it('should sort by created_at when filter is not specified', async () => {
    const sorted = await repository['applySort'](categories, null, null)
    expect(sorted).toStrictEqual([categories[2], categories[1], categories[3], categories[4], categories[0]])
  })

  it('should sort by created_at asc when filter created_at asc is specified', async () => {
    const sorted = await repository['applySort'](categories, 'created_at', 'asc')
    expect(sorted).toStrictEqual([categories[0], categories[4], categories[3], categories[1], categories[2]])
  })

  it('should sort by name desc when filter name and desc order is specified', async () => {
    const sorted = await repository['applySort'](categories, 'name', 'desc')
    expect(sorted).toStrictEqual([categories[1], categories[3], categories[4], categories[0], categories[2]])
  })

  it('should sort by name asc when filter name is specified and asc order is specified', async () => {
    const sorted = await repository['applySort'](categories, 'name', 'asc')
    expect(sorted).toStrictEqual([categories[2], categories[0], categories[4], categories[3], categories[1]])
  })

  it('should sort by description desc when filter description and desc order is specified', async () => {
    const sorted = await repository['applySort'](categories, 'description', 'desc')
    expect(sorted).toStrictEqual([categories[2], categories[1], categories[3], categories[4], categories[0]])
  })

  it('should sort by description asc when filter description is specified and asc order is specified', async () => {
    const sorted = await repository['applySort'](categories, 'description', 'asc')
    expect(sorted).toStrictEqual([categories[0], categories[4], categories[3], categories[1], categories[2]])
  })
})
