import { beforeEach, describe, expect, it } from 'vitest'

import { SearchGymsUseCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to fetch check-in history', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      latitude: -20.3992387,
      longitude: -43.5105982,
    })
    await gymsRepository.create({
      title: 'Typescript Gym',
      latitude: -20.3992387,
      longitude: -43.5105982,
    })

    const { gyms } = await sut.execute({
      query: 'JavaScript',
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able to fetch paginated gyms search', async () => {
    for (let i = 0; i <= 21; i++) {
      await gymsRepository.create({
        title: `JavaScript Gym ${i + 1}`,
        latitude: -20.3992387,
        longitude: -43.5105982,
        description: null,
        phone: null,
      })
    }

    const { gyms } = await sut.execute({
      query: 'JavaScript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym 21' }),
      expect.objectContaining({ title: 'JavaScript Gym 22' }),
    ])
  })
})
