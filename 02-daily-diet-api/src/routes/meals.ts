import { FastifyInstance } from 'fastify'
import { MealsController } from '../controllers/meals-controller'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

const mealsController = new MealsController()

export async function mealsRoute(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, mealsController.index)
  app.get('/:id', { preHandler: [checkSessionIdExists] }, mealsController.show)
  app.put(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    mealsController.update,
  )
  app.post('/', mealsController.create)
  app.delete(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    mealsController.delete,
  )
}
