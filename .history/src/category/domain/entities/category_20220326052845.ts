import { Entity } from '../../../@seedwork/domain/entities/entity'
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'

export class Category extends Entity<CategoryProperties> {
  readonly _id: UniqueEntityId
  readonly name: string
  readonly description?: string
  readonly createdAt?: Date
  private _isActive?: boolean

  constructor(props: CategoryProperties, id?: UniqueEntityId) {
    super(id)
    this.name = props.name
    this.description = props.description
    this.createdAt = props.created_at ?? new Date()
    this._isActive = props.is_active ?? true
  }

  get id(): string {
    return this._id.id
  }

  create(): void {}

  update(): void {}

  isActive(): boolean {
    return !!this._isActive
  }

  activate(): void {
    this._isActive = true
  }

  deactivate(): void {
    this._isActive = false
  }
}

type CategoryProperties = {
  id?: UniqueEntityId
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}
