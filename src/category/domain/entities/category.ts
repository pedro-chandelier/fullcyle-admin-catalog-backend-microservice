import { Entity } from '../../../@seedwork/domain/entities/entity'
import { UniqueEntityId } from '../../../@seedwork/domain/value-objects/unique-entity-id/unique-entity-id'
import { CategoryValidatorFactory } from '../validators/category.validator'
import { EntityValidationError } from '../../../@seedwork/domain/validators/errors/entity-validation.error'

export class Category extends Entity<CategoryProperties> {
  constructor(readonly props: CategoryProperties) {
    Category.validate(props)
    super(props)
    this.props.name = props.name
    this.props.description = props.description ?? null
    this.props.createdAt = props.createdAt ?? new Date()
    this.props.isActive = props.isActive ?? true
  }

  // static validate (props: Omit<CategoryProperties, 'createdAt'>): void {
  //   RulesValidator.validate(props.name, 'name').string().maxLength(255).required()
  //   RulesValidator.validate(props.description, 'description').string()
  //   RulesValidator.validate(props.isActive, 'isActive').boolean()
  // }

  static validate(props: CategoryProperties): void {
    const validator = CategoryValidatorFactory.create()
    if (!validator.validate(props)) {
      throw new EntityValidationError(validator.errors)
    }
  }

  update(name: string, description: string): void {
    Category.validate({ name, description })
    this.name = name
    this.description = description
  }

  activate(): void {
    this.props.isActive = true
  }

  deactivate(): void {
    this.props.isActive = false
  }

  get isActive(): boolean {
    return !!this.props.isActive
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

  get createdAt(): Date {
    return this.props.createdAt
  }
}

export type CategoryProperties = {
  id?: UniqueEntityId
  name: string
  description?: string
  isActive?: boolean
  createdAt?: Date
}
