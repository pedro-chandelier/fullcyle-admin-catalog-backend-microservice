import { RepositoryInterface, SearcheableRepositoryInterface } from '../contracts/repository-contracts.interface'
import { Entity } from '../../entities/entity'
import { UniqueEntityId } from '../../value-objects/unique-entity-id/unique-entity-id'
import { EntityNotFoundError } from '../errors/entity-not-found.error'

export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {
  items: E[] = []

  async findById(id: string | UniqueEntityId): Promise<E> {
    const _id = `${id}`
    return this._get(_id)
  }

  async findAll(): Promise<E[]> {
    return this.items
  }

  async insert(entity: E): Promise<void> {
    this.items.push(entity)
  }

  async update(entity: E): Promise<void> {
    await this._get(entity.id)
    const itemIndex = this.items.findIndex(({ id }) => id === entity.id)
    this.items[itemIndex] = entity
  }

  async remove(id: string | UniqueEntityId): Promise<void> {
    const _id = `${id}`
    await this._get(_id)
    const itemIndex = this.items.findIndex(item => item.id === _id)
    this.items.splice(itemIndex, 1)
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find(({ id: _id }) => _id === id)
    if (!item) {
      throw new EntityNotFoundError(`Entity not found from ID ${id}`)
    }
    return item
  }
}

export abstract class InMemorySearcheableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearcheableRepositoryInterface<E, any, any>
{
  search (props: any): Promise<any> {
    throw new Error('Not implemented yet')
  }
}
