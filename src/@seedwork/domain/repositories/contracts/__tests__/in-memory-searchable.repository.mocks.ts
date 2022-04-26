import { Entity } from '#seedwork/domain/entities/entity'
import { InMemorySearchableRepository } from '#seedwork/domain/repositories/in-memory/in-memory.repository'

type EntityPropsStub = {
  name: string
  price: number
}

export class EntityStub extends Entity<EntityPropsStub> {}

export class InMemorySearchableRepositoryStub extends InMemorySearchableRepository<EntityStub> {
  sortableFields: string[] = ['name']

  protected applyFilter(items: EntityStub[], filter: string): Promise<EntityStub[]> {
    if (!filter) return Promise.resolve(items)

    return Promise.resolve(
      items.filter(e => {
        return e.props.name.toLowerCase().includes(filter.toLowerCase()) || e.props.price.toString() === filter
      })
    )
  }
}
