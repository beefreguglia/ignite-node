import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FindAllParams, PetsRepository } from '../pet-repository'

export class InMemoryPetRepository implements PetsRepository {
  public pets: Pet[] = []

  findAll(params: FindAllParams): Promise<Pet[]> {}

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      age: data.age,
      depends: data.depends,
      energy_level: data.energy_level,
      description: data.description,
      image: data.image,
      name: data.name,
      organizationId: data.organizationId,
      size: data.size,
      space: data.space,
    }

    this.pets.push(pet)

    return pet
  }
}
