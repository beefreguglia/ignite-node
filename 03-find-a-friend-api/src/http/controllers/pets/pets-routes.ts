import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { PetsController } from './pets-controller'

const petsController = new PetsController()

export async function petsRoutes(app: FastifyInstance) {
  app.post(
    '/organizations/pets',
    { onRequest: [verifyJwt] },
    petsController.create,
  )
  app.get('/organizations/pets/:id', petsController.show)
  app.get('/organizations/pets', petsController.index)
}
