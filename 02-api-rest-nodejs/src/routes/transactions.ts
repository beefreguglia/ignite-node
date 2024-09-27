import { FastifyInstance } from 'fastify'

import { checkSessionIdExists } from '../middlewares/check-session-id-exists'
import { TransactionController } from '../controllers/transactionsController'

const transactionController = new TransactionController()

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    '/',
    { preHandler: [checkSessionIdExists] },
    transactionController.index,
  )

  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    transactionController.show,
  )

  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    transactionController.summary,
  )

  app.post('/', transactionController.create)
}
