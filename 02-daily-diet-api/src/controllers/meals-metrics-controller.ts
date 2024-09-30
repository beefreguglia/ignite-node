import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database/knex'
import { AppError } from '../utils/app-error'

export class MealsMetricsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user?.id

    if (!userId) {
      throw new AppError('User id not found.', 404)
    }

    const totalMealsOutsideDiet = await knex('meals')
      .count('id', { as: 'total' })
      .where({ user_id: userId, fits_diet: false })
      .first()

    const totalMealsInsideDiet = await knex<MealsRepository>('meals')
      .count('id', { as: 'total' })
      .where({ user_id: userId, fits_diet: true })
      .first()

    const totalMeals = await knex<MealsRepository>('meals')
      .where({
        user_id: userId,
      })
      .orderBy('date', 'desc')

    const { bestInsideDietSequence } = totalMeals.reduce(
      (acc, meal) => {
        if (meal.fits_diet) {
          acc.currentSequence += 1
        } else {
          acc.currentSequence = 0
        }

        if (acc.currentSequence > acc.bestInsideDietSequence) {
          acc.bestInsideDietSequence = acc.currentSequence
        }

        return acc
      },
      { bestInsideDietSequence: 0, currentSequence: 0 },
    )

    return reply.send({
      totalMeals: totalMeals.length,
      totalMealsInsideDiet: totalMealsInsideDiet?.total,
      totalMealsOutsideDiet: totalMealsOutsideDiet?.total,
      bestInsideDietSequence,
    })
  }
}
