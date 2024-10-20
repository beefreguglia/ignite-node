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
      latitude: new Decimal(-20.3992387),
      longitude: new Decimal(-43.5105982),
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
      userLatitude: -20.3992387,
      userLongitude: -43.5105982,
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
      userLatitude: -20.3992387,
      userLongitude: -43.5105982,
    })

    await expect(() =>
      sut.execute({
        gymId,
        userId,
        userLatitude: -20.3992387,
        userLongitude: -43.5105982,
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
      userLatitude: -20.3992387,
      userLongitude: -43.5105982,
    })

    vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      gymId,
      userId,
      userLatitude: -20.3992387,
      userLongitude: -43.5105982,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check-in on distant gym', async () => {
    const userId = 'user-01'
    const userLatitude = -20.3995932
    const userLongitude = -43.5115262

    gymsRepository.items.push({
      id: 'gym-02',
      title: 'CSS Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-20.406716),
      longitude: new Decimal(-43.5606024),
    })

    await expect(
      sut.execute({
        gymId: 'gym-02',
        userId,
        userLatitude,
        userLongitude,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
