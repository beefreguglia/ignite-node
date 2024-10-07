import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: CheckinUseCase

describe('Authenticate user case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinUseCase(checkInsRepository)
  })

  it('should be able to authenticate', async () => {
    const gymId = 'gym-01'
    const userId = 'user-01'

    const { checkIn } = await sut.execute({
      gymId,
      userId,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
