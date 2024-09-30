import { FastifyInstance } from 'fastify'

import { UsersController } from '../controllers/users-controller'

const usersController = new UsersController()

export async function usersRoute(app: FastifyInstance) {
  app.post('/', usersController.create)
}
