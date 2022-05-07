import { v4 as uuid, validate as isValidUUID } from 'uuid'

import { ValueObject } from '../value-object'
import { InvalidUniqueEntityIdError } from './invalid-unique-entity-id.error'

export class UniqueEntityId extends ValueObject<string> {
  constructor(readonly _id?: string) {
    super(_id || uuid())
    this.validateId(_id)
  }

  get id(): string {
    return super.value
  }

  private validateId(id: string): void {
    if (id && !isValidUUID(id)) {
      throw new InvalidUniqueEntityIdError()
    }
  }
}
