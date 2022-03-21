import { v4 as uuid, validate as isValidUUID } from 'uuid'

import { InvalidEntityIdError } from '../../errors/invalid-entity-id'

export class EntityId {
  constructor(private _id?: string) {
    this.assignId(_id)
  }

  get id(): string {
    return this._id as string
  }

  private assignId(anId?: string): void {
    if (anId !== undefined) {
      this.validateId(anId)
      this._id = anId
    } else {
      this._id = uuid()
    }
  }

  private validateId(id: string): void {
    if (!isValidUUID(id)) {
      throw new InvalidEntityIdError()
    }
  }
}
