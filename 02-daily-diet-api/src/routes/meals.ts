import { FastifyInstance } from 'fastify'
import { MealsController } from '../controllers/meals-controller'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { MealsMetricsController } from '../controllers/meals-metrics-controller'

const mealsController = new MealsController()
const mealsMetricsController = new MealsMetricsController()

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
  app.get('/metrics', mealsMetricsController.index)
}
