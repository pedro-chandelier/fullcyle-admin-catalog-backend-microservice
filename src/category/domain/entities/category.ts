import { EntityId } from '../../../@seedwork/domain/value-objects/entity-id'

export class Category {
  readonly _id: EntityId
  readonly name: string
  readonly description?: string
  readonly createdAt?: Date
  private _isActive?: boolean

  constructor({ id, name, description, is_active, created_at }: CategoryProperties) {
    this._id = new EntityId(id)
    this.name = name
    this.description = description
    this.createdAt = created_at ?? new Date()
    this._isActive = is_active ?? true
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
  id?: string
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}
