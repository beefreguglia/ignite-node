import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { GetPetUseCase } from './get-pet-use-case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { makePet } from 'tests/factory/make-pet'
import { PetNotFoundError } from './errors/pet-not-found-error'

describe('Get Pet Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: GetPetUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get a new pet', async () => {
    const pet = await petsRepository.create(makePet())
    const result = await sut.execute({ id: pet.id })

    expect(result.pet).toEqual(pet)
  })

  it('should not be able to get a non-existing pet', async () => {
    await expect(sut.execute({ id: 'invalid' })).rejects.toBeInstanceOf(
      PetNotFoundError,
    )
  })
})
