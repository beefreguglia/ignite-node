import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database/knex'

export class MealsMetricsController {
  async index(request: FastifyRequest, reply: FastifyReply) {
    const { sessionId } = request.cookies

    const totalMealsOutsideDiet = await knex('meals')
      .count('id', { as: 'total' })
      .where({ session_id: sessionId, fits_diet: false })
      .first()

    const totalMealsInsideDiet = await knex<MealsRepository>('meals')
      .count('id', { as: 'total' })
      .where({ session_id: sessionId, fits_diet: true })
      .first()

    const totalMeals = await knex<MealsRepository>('meals')
      .where({
        session_id: sessionId,
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
