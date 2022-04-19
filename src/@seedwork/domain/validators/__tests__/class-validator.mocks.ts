import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidator } from '../class-validator'

export class RulesStub {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

export class ClassValidatorStub extends ClassValidator<RulesStub> {
  validate(data: any): boolean {
    return super.validate(new RulesStub(data))
  }
}
