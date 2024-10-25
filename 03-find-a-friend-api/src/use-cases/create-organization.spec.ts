import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    const city = 'City example'
    const complement = 'complement'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const number = 22
    const state = 'TS'
    const street = 'test'

    const { organization } = await sut.execute({
      email,
      password,
      name,
      owner_name,
      phone,
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      complement,
      number,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be able to create a new organization with only required fields', async () => {
    const city = 'City example'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const state = 'TS'
    const street = 'test'
    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'

    const { organization } = await sut.execute({
      email,
      password,
      name,
      owner_name,
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new organization with same email twice', async () => {
    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    const city = 'City example'
    const complement = 'complement'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const state = 'TS'
    const street = 'test'

    await organizationRepository.create({
      email,
      password,
      name,
      owner_name,
      phone,
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      complement,
    })

    await expect(() =>
      sut.execute({
        email,
        password,
        name,
        owner_name,
        phone,
        city,
        latitude,
        longitude,
        neighborhood,
        state,
        street,
        complement,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
