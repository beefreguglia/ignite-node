import { describe, beforeEach, it, expect } from 'vitest'

import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/pets-in-memory-repository'
import { FetchPetsByCityUseCase } from './fetch-pets-by-city-use-case'
import { makePet } from 'tests/factory/make-pet'
import { makeOrganization } from 'tests/factory/make-org'

describe('Fetch Pets by city Use Case', () => {
  let organizationsRepository: InMemoryOrganizationsRepository
  let petsRepository: InMemoryPetsRepository
  let sut: FetchPetsByCityUseCase

  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    petsRepository = new InMemoryPetsRepository(organizationsRepository)
    sut = new FetchPetsByCityUseCase(petsRepository)
  })

  it('should be able to fetch pets by city', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(makePet({ organization_id: organization.id }))
    await petsRepository.create(makePet({ organization_id: organization.id }))

    const organization2 = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(makePet({ organization_id: organization2.id }))

    const { pets } = await sut.execute({ city: organization.city })

    expect(pets).toHaveLength(2)

    const { pets: pets2 } = await sut.execute({ city: organization2.city })

    expect(pets2).toHaveLength(1)
  })

  it('should be able to fetch pets by city and age', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(
      makePet({ organization_id: organization.id, age: 1 }),
    )
    await petsRepository.create(makePet({ organization_id: organization.id }))

    const { pets } = await sut.execute({ city: organization.city, age: '1' })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and size', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(
      makePet({ organization_id: organization.id, size: 'SMALL' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, size: 'MEDIUM' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, size: 'LARGE' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      size: 'SMALL',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and energy_level', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(
      makePet({ organization_id: organization.id, energy_level: 'VERY_LOW' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, energy_level: 'LOW' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, energy_level: 'MEDIUM' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, energy_level: 'HIGH' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, energy_level: 'VERY_HIGH' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      energy_level: 'LOW',
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by city and environment', async () => {
    const organization = await organizationsRepository.create(
      makeOrganization(),
    )

    await petsRepository.create(
      makePet({ organization_id: organization.id, environment: 'SMALL' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, environment: 'MEDIUM' }),
    )
    await petsRepository.create(
      makePet({ organization_id: organization.id, environment: 'LARGE' }),
    )

    const { pets } = await sut.execute({
      city: organization.city,
      environment: 'MEDIUM',
    })

    console.log(pets)
    expect(pets).toHaveLength(1)
  })
})
