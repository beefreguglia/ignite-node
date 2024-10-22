import { FastifyInstance } from 'fastify'

import { UsersController } from './users-controller'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

const usersController = new UsersController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', usersController.create)
  app.post('/sessions', usersController.authenticate)

  app.patch('/token/refresh', usersController.refresh)

  /** Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, usersController.profile)
}
