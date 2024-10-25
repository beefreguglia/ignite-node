import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { OrganizationNotFoundError } from '@/use-cases/errors/organization-not-found-error'
import { PetNotFoundError } from '@/use-cases/errors/pet-not-found-error'
import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet-use-case'
import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { makeFetchPetsByCityUseCase } from '@/use-cases/factories/make-fetch-pets-by-city-use-case'

const createBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  image: z.string(),
  age: z.number(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  energy_level: z.enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH']),
  environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  depends: z.enum(['LOW', 'MEDIUM', 'HIGH']),
})

const showParamsSchema = z.object({
  id: z.string().uuid(),
})

const indexQuerySchema = z.object({
  city: z.string().min(1),
  age: z.string().optional(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  energy_level: z
    .enum(['VERY_LOW', 'LOW', 'MEDIUM', 'HIGH', 'VERY_HIGH'])
    .optional(),
  environment: z.enum(['SMALL', 'MEDIUM', 'LARGE']).optional(),
  depends: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
})

export class PetsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const {
      age,
      depends,
      description,
      energy_level,
      environment,
      image,
      name,
      size,
    } = createBodySchema.parse(request.body)

    const createPetUseCase = makeCreatePetUseCase()

    const organization_id = request.user.sub

    try {
      const { pet } = await createPetUseCase.execute({
        age,
        depends,
        description,
        energy_level,
        environment,
        image,
        name,
        organization_id,
        size,
      })

      return reply.status(201).send(pet)
    } catch (error) {
      if (error instanceof OrganizationNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      console.error(error)

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = showParamsSchema.parse(request.params)

    const getPetUseCase = makeGetPetUseCase()

    try {
      const { pet } = await getPetUseCase.execute({ id })

      return reply.status(200).send(pet)
    } catch (error) {
      if (error instanceof PetNotFoundError) {
        return reply.status(404).send({ message: error.message })
      }

      console.error(error)

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }

  async index(request: FastifyRequest, reply: FastifyReply) {
    const { city, age, size, energy_level, environment, depends } =
      indexQuerySchema.parse(request.query)

    const fetchPetsByCityUseCase = makeFetchPetsByCityUseCase()

    try {
      const { pets } = await fetchPetsByCityUseCase.execute({
        city,
        age,
        size,
        energy_level,
        environment,
        depends,
      })

      return reply.status(200).send({ pets })
    } catch (error) {
      console.error(error)

      return reply.status(500).send({ message: 'Internal server error' })
    }
  }
}
