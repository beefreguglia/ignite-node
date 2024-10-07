import { FastifyInstance } from 'fastify'

import { UsersController } from './controllers/users-controller'

const usersController = new UsersController()

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', usersController.create)
  app.post('/sessions', usersController.authenticate)
}
