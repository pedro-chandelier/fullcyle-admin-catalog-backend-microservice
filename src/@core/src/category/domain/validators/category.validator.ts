import { CategoryProperties } from '#category/domain/entities/category'
import { ClassValidator } from '#seedwork/domain/validators/class-validator'
import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator'

export class CategoryRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsOptional()
  description: string

  @IsBoolean()
  @IsOptional()
  isActive: boolean

  @IsDate()
  @IsOptional()
  createdAt: Date

  constructor({ name, description, isActive, createdAt }: CategoryProperties) {
    Object.assign(this, { name, description, isActive, createdAt })
  }
}

export class CategoryValidator extends ClassValidator<CategoryRules> {
  validate(data: CategoryProperties): boolean {
    return super.validate(new CategoryRules(data ?? ({} as any)))
  }
}

export class CategoryValidatorFactory {
  static create(): CategoryValidator {
    return new CategoryValidator()
  }
}
