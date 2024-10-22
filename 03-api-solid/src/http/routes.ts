import { FastifyInstance } from 'fastify'

import { UsersController } from './controllers/users-controller'
import { verifyJWT } from './middlewares/verify-jwt'

const usersController = new UsersController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/register', usersController.create)
  app.post('/sessions', usersController.authenticate)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, usersController.profile)
}
