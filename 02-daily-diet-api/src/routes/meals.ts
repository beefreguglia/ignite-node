import { FastifyInstance } from 'fastify'
import { MealsController } from '../controllers/meals-controller'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

const mealsController = new MealsController()

export async function mealsRoute(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, mealsController.index)
  app.post('/', mealsController.create)
}
