import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'
import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'
import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metricts'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in'

export class CheckInsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createCheckInParamsSchema = z.object({
      gymId: z.string().uuid(),
    })

    const createCheckInBodySchema = z.object({
      latitude: z.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.number().refine((value) => Math.abs(value) <= 180),
    })

    const { gymId } = createCheckInParamsSchema.parse(request.params)
    const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      userLatitude: latitude,
      userLongitude: longitude,
      gymId,
      userId: request.user.sub,
    })

    return reply.status(201).send()
  }

  async history(request: FastifyRequest, reply: FastifyReply) {
    const checkInHistoryQuerySchema = z.object({
      page: z.coerce.number().min(1).default(1),
    })

    const { page } = checkInHistoryQuerySchema.parse(request.query)

    const fetchUserCheckInHistoryController =
      makeFetchUserCheckInsHistoryUseCase()

    const { checkIns } = await fetchUserCheckInHistoryController.execute({
      userId: request.user.sub,
      page,
    })

    return reply.status(200).send({ checkIns })
  }

  async validate(request: FastifyRequest, reply: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
      checkInId: z.string().uuid(),
    })

    const { checkInId } = validateCheckInParamsSchema.parse(request.params)

    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()
  }

  async metrics(request: FastifyRequest, reply: FastifyReply) {
    const fetchNearbyGyms = makeGetUserMetricsUseCase()

    const { checkInsCount } = await fetchNearbyGyms.execute({
      userId: request.user.sub,
    })

    return reply.status(200).send({
      checkInsCount,
    })
  }
}
