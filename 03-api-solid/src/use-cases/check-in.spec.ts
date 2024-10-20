import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { CheckinUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinUseCase

describe('Check-in use case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinUseCase(checkInsRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const gymId = 'gym-01'
    const userId = 'user-01'

    const { checkIn } = await sut.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  // Red - Estado em que o teste falha
  // Green - Estado em que o teste passa minimamente
  // Refactor - Estado onde refinamos a feature

  it('should not be able to check-in 2 twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const gymId = 'gym-01'
    const userId = 'user-01'

    await sut.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      sut.execute({
        gymId,
        userId,
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check-in 2 twice but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0))
    const gymId = 'gym-01'
    const userId = 'user-01'

    await sut.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId,
      userId,
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
