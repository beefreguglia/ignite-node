/* eslint-disable camelcase */
import { randomUUID } from 'crypto'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { knex } from '../../database/knex'
import { AppError } from '../utils/app-error'

export class MealsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const meals = await knex<MealsRepository>('meals').select().where({
      user_id: userId,
    })

    reply.send({ meals })
  }

  async show(request: FastifyRequest, reply: FastifyReply) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const meal = await knex<MealsRepository>('meals')
      .select()
      .where({
        user_id: userId,
        id,
      })
      .first()

    reply.send({ meal })
  }

  async create(request: FastifyRequest, reply: FastifyReply) {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().optional(),
      fits_diet: z.boolean(),
    })
    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const { name, date, description, fits_diet } = createMealBodySchema.parse(
      request.body,
    )

    await knex<MealsRepository>('meals').insert({
      id: randomUUID(),
      user_id: userId,
      name,
      description,
      date,
      fits_diet,
    })

    reply.status(201).send()
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const meal = await knex<MealsRepository>('meals')
      .where({
        user_id: userId,
        id,
      })
      .first()

    if (!meal) {
      throw new AppError('Meal not exists')
    }

    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      date: z.string().optional(),
      fits_diet: z.boolean(),
    })

    const { name, date, description, fits_diet } = createMealBodySchema.parse(
      request.body,
    )

    await knex<MealsRepository>('meals')
      .update({
        name,
        description,
        date,
        fits_diet,
        updated_at: knex.fn.now(),
      })
      .where({
        user_id: userId,
        id,
      })

    reply.status(204).send()
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const { id } = z
      .object({
        id: z.string(),
      })
      .parse(request.params)

    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const meal = await knex<MealsRepository>('meals')
      .where({
        user_id: userId,
        id,
      })
      .first()

    if (!meal) {
      throw new AppError('Meal not exists')
    }

    await knex<MealsRepository>('meals')
      .where({
        id,
        user_id: userId,
      })
      .delete()

    reply.status(204).send()
  }
}
