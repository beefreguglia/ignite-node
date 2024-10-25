import { Prisma, Pet } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { FindAllParams, PetsRepository } from '../pets-repository'
import { InMemoryOrganizationsRepository } from './organizations-in-memory-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  constructor(private orgsRepository: InMemoryOrganizationsRepository) {}

  async findAll(params: FindAllParams): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.organizations.filter(
      (org) => org.city === params.city,
    )

    const pets = this.pets
      .filter((pet) => orgsByCity.some((org) => org.id === pet.organization_id))
      .filter((pet) => (params.age ? pet.age === Number(params.age) : true))
      .filter((pet) => (params.size ? pet.size === params.size : true))
      .filter((pet) =>
        params.energy_level ? pet.energy_level === params.energy_level : true,
      )
      .filter((pet) =>
        params.environment ? pet.environment === params.environment : true,
      )

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      age: data.age,
      depends: data.depends,
      energy_level: data.energy_level,
      description: data.description,
      image: data.image,
      name: data.name,
      organization_id: data.organization_id,
      size: data.size,
      environment: data.environment,
    }

    this.pets.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) ?? null
  }
}
