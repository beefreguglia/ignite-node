import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPetRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { CreatePetUseCase } from './create-pet'

let petsRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(petsRepository)
  })

  it('should be able to create a new organization', async () => {
    const age = 1
    const depends = 'MEDIUM'
    const description = 'description'
    const energy_level = 'MEDIUM'
    const image = 'image'
    const name = 'Test name'
    const size = 'MEDIUM'
    const space = 'MEDIUM'

    const { pet } = await sut.execute({
      age,
      depends,
      description,
      energy_level,
      image,
      name,
      organizationId: 'Org Id',
      size,
      space,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
