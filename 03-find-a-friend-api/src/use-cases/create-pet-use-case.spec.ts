import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { CreatePetUseCase } from './create-pet-use-case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { makeOrganization } from 'tests/factory/make-org'
import { makePet } from 'tests/factory/make-pet'

let organizationsRepository: InMemoryOrganizationsRepository
let petsRepository: InMemoryPetsRepository
let sut: CreatePetUseCase

describe('Create pet use case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new CreatePetUseCase(organizationsRepository, petsRepository)
  })

  it('should be able to create a new pet', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    const { pet } = await sut.execute(
      makePet({ organization_id: organization.id }),
    )

    expect(pet.id).toEqual(expect.any(String))
  })
})
