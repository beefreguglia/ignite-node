import { InMemoryAddressRepository } from '@/repositories/in-memory/address-in-memory-repository'
import { CreateAddressUseCase } from './create-address'
import { beforeEach, describe, expect, it } from 'vitest'

let addressRepository: InMemoryAddressRepository
let sut: CreateAddressUseCase

describe('Create address use case', () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository()
    sut = new CreateAddressUseCase(addressRepository)
  })

  it('should be able to create a new address', async () => {
    const city = 'City example'
    const complement = 'complement'
    const latitude = 1
    const longitude = 1
    const neighborhood = 'neighbor example'
    const number = 22
    const state = 'TS'
    const street = 'test'

    const { address } = await sut.execute({
      city,
      complement,
      latitude,
      longitude,
      neighborhood,
      number,
      state,
      street,
    })

    expect(address.id).toEqual(expect.any(String))
  })
})
