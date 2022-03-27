import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

export abstract class Entity<Props> {
  readonly uniqueEntityId: UniqueEntityId

  constructor(readonly props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = id || new UniqueEntityId()
  }

  get id (): string {
    return this.uniqueEntityId.value
  }

  toJSON () {
    return {
      id: this.id,
      ...this.props
    }
  }
}
