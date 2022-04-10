import { UniqueEntityId } from '../value-objects/unique-entity-id/unique-entity-id'

export abstract class Entity<Props = any> {
  readonly uniqueEntityId: UniqueEntityId

  constructor(readonly props: Props) {
    this.uniqueEntityId = (props as any).id || new UniqueEntityId()
  }

  get id(): string {
    return this.uniqueEntityId.value
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props
    } as Required<{ id: string } & Props>
  }
}
