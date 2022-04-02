import { Entity } from '../../../@seedwork/domain/entities/entity'
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'
import { CategoryValidatorFactory } from '../validators/category.validator'

export class Category extends Entity<CategoryProperties> {
  constructor(readonly props: CategoryProperties) {
    Category.validate(props)
    super(props)
    this.props.name = props.name
    this.props.description = props.description
    this.props.created_at = props.created_at ?? new Date()
    this.props.is_active = props.is_active ?? true
  }

  // static validate (props: Omit<CategoryProperties, 'created_at'>): void {
  //   RulesValidator.validate(props.name, 'name').string().maxLength(255).required()
  //   RulesValidator.validate(props.description, 'description').string()
  //   RulesValidator.validate(props.is_active, 'is_active').boolean()
  // }

  static validate (props: CategoryProperties): void {
    const validator = CategoryValidatorFactory.create()
    validator.validate(props)
  }

  update (name: string, description: string): void {
    Category.validate({ name, description })
    this.name = name
    this.description = description
  }

  activate (): void {
    this.props.is_active = true
  }

  deactivate (): void {
    this.props.is_active = false
  }

  isActive (): boolean {
    return !!this.props.is_active
  }

  get name (): string {
    return this.props.name
  }

  private set name (value: string) {
    this.props.name = value
  }

  get description (): string {
    return this.props.description
  }

  private set description (value: string) {
    this.props.description = value
  }

  get createdAt (): Date {
    return this.props.created_at
  }
}

export type CategoryProperties = {
  id?: UniqueEntityId
  name: string
  description?: string
  is_active?: boolean
  created_at?: Date
}
