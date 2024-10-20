import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create a new gym', async () => {
    const title = 'JavaScript Gym'
    const description = null
    const latitude = -20.3992387
    const longitude = -43.5105982
    const phone = null

    const { gym } = await sut.execute({
      title,
      description,
      latitude,
      longitude,
      phone,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
