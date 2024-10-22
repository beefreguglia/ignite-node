import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/errors/invalid-credentials-error'
import { InvalidCredentialsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, name, password } = registerBodySchema.parse(request.body)

    try {
      const registerUseCase = makeRegisterUseCase()

      await registerUseCase.execute({ email, name, password })
    } catch (err) {
      if (err instanceof UserAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }

      throw err
    }

    return reply.status(201).send()
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const { email, password } = authenticateBodySchema.parse(request.body)

    try {
      const authenticateUseCase = makeAuthenticateUseCase()

      const { user } = await authenticateUseCase.execute({ email, password })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: user.id,
          },
        },
      )

      return reply.status(200).send({ token })
    } catch (err) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message })
      }
      throw err
    }
  }

  async profile(request: FastifyRequest, reply: FastifyReply) {
    await request.jwtVerify()
    return reply.status(200).send()
  }
}
