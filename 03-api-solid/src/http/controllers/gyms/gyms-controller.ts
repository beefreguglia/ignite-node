import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'
import { makeSearchGymsUseCase } from '@/use-cases/factories/make-search-gyms'
import { makeFetchNearbyGymsUseCase } from '@/use-cases/factories/make-fetch-nearby-gyms'

export class GymsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      title: z.string(),
      description: z.string().nullable(),
      phone: z.string().nullable(),
      latitude: z.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.number().refine((value) => Math.abs(value) <= 180),
    })

    const { description, latitude, longitude, phone, title } =
      registerBodySchema.parse(request.body)

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
      description,
      latitude,
      longitude,
      phone,
      title,
    })

    return reply.status(201).send()
  }

  async search(request: FastifyRequest, reply: FastifyReply) {
    const searchGymsQuerySchema = z.object({
      q: z.string(),
      page: z.coerce.number().min(1).default(1),
    })

    const { q, page } = searchGymsQuerySchema.parse(request.query)

    const searchGymsUseCase = makeSearchGymsUseCase()

    const { gyms } = await searchGymsUseCase.execute({ query: q, page })

    return reply.status(200).send({ gyms })
  }

  async nearby(request: FastifyRequest, reply: FastifyReply) {
    const nearbyGymsQuerySchema = z.object({
      latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
    })

    const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

    const fetchNearbyGyms = makeFetchNearbyGymsUseCase()

    const { gyms } = await fetchNearbyGyms.execute({
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(200).send({
      gyms,
    })
  }
}
