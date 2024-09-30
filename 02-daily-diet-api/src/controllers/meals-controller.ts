/* eslint-disable camelcase */
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../../database/knex'

export class MealsController {
  async index(request: FastifyRequest) {
    const { sessionId } = request.cookies

    const meals = await knex('meals').select().where({
      session_id: sessionId,
    })

    return { meals }
  }

  async show(request: FastifyRequest) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    const { sessionId } = request.cookies

    const meal = await knex('meals')
      .select()
      .where({
        session_id: sessionId,
        id,
      })
      .first()

    return { meal }
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().optional(),
      fits_diet: z.boolean(),
    })

    const { name, date, description, fits_diet } = createMealBodySchema.parse(
      request.body,
    )

    let { sessionId } = request.cookies

    if (!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      date,
      fits_diet,
      session_id: sessionId,
    })

    reply.status(201)
  }

  async update(request: FastifyRequest) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    const { sessionId } = request.cookies

    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().optional(),
      fits_diet: z.boolean(),
    })

    const { name, date, description, fits_diet } = createMealBodySchema.parse(
      request.body,
    )

    await knex('meals')
      .update({
        name,
        description,
        date,
        fits_diet,
      })
      .where({
        id,
        session_id: sessionId,
      })
  }

  async delete(request: FastifyRequest) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    console.log(id)
    const { sessionId } = request.cookies

    await knex('meals')
      .where({
        id,
        session_id: sessionId,
      })
      .delete()
  }
}
