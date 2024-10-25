import { InMemoryAddressRepository } from '@/repositories/in-memory/address-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { ResourceNotFoundError } from './errors/resource-not-found'

let addressRepository: InMemoryAddressRepository
let organizationRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(
      addressRepository,
      organizationRepository,
    )
  })

  it('should be able to create a new organization', async () => {
    const city = 'City example'
    const complement = 'complement'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const number = 22
    const state = 'TS'
    const street = 'test'

    const address = await addressRepository.create({
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      complement,
      number,
    })

    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    const { organization } = await sut.execute({
      email,
      password,
      name,
      owner_name,
      phone,
      address_id: address.id,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be able to create a new organization with number and complement and phone undefined', async () => {
    const city = 'City example'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const state = 'TS'
    const street = 'test'

    const address = await addressRepository.create({
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
    })

    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'

    const { organization } = await sut.execute({
      email,
      password,
      name,
      owner_name,
      address_id: address.id,
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new organization with same email twice', async () => {
    const city = 'City example'
    const complement = 'complement'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const number = 22
    const state = 'TS'
    const street = 'test'

    const address = await addressRepository.create({
      city,
      latitude,
      longitude,
      neighborhood,
      state,
      street,
      complement,
      number,
    })

    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    await organizationRepository.create({
      email,
      password,
      name,
      owner_name,
      phone,
      addressId: address.id,
    })

    await expect(() =>
      sut.execute({
        email,
        password,
        name,
        owner_name,
        phone,
        address_id: address.id,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to create with a wrong address id', async () => {
    const wrongId = 'wrong_id'

    const email = 'test@example.com'
    const password = '123456'
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    await expect(() =>
      sut.execute({
        email,
        password,
        name,
        owner_name,
        phone,
        address_id: wrongId,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
