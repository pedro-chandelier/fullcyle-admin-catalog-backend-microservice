import { Entity } from '../../../@seedwork/domain/entities/entity'
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'

export class Category extends Entity<CategoryProperties> {
  constructor(readonly props: CategoryProperties) {
    super(props)
    this.props.name = props.name
    this.props.description = props.description
    this.props.created_at = props.created_at ?? new Date()
    this.props.is_active = props.is_active ?? true
  }

  update({ name, description }: UpdateCategoryTypes): void {
    if (name !== undefined) this.name = name
    if (description !== undefined) this.description = description
  }

  isActive(): boolean {
    return !!this.props.is_active
  }

  activate(): void {
    this.props.is_active = true
  }

  deactivate(): void {
    this.props.is_active = false
  }

  get name(): string {
    return this.props.name
  }

  private set name(value: string) {
    this.props.name = value
  }

  get description(): string {
    return this.props.description
  }

  private set description(value: string) {
    this.props.description = value
  }

  get createdAt (): Date {
    return this.props.created_at
  }
}

type UpdateCategoryTypes = {
  name?: string
  description?: string
}

type CategoryProperties = {
  id?: UniqueEntityId
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}
