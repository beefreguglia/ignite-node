import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../../database/knex'
import { randomUUID } from 'node:crypto'

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
    })

    const { name, email } = createMealBodySchema.parse(request.body)

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }
    const userByEmail = await knex('users').where({ email }).first()

    if (userByEmail) {
      return reply.status(400).send({ message: 'User already exists' })
    }

    await knex<UsersRepository>('users').insert({
      id: randomUUID(),
      session_id: sessionId,
      name,
      email,
    })

    reply.status(201).send()
  }
}
