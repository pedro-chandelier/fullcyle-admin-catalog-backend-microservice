import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id';

export abstract class Entity<Props> {
  readonly uniqueEntityId: UniqueEntityId

  constructor(props: Props, id?: UniqueEntityId) {
    this.uniqueEntityId = new UniqueEntityId(id?.id)
  }
}
