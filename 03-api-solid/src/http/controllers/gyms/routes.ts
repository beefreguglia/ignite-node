import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { GymsController } from './gyms-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

const gymsController = new GymsController()

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', gymsController.search)
  app.get('/gyms/nearby', gymsController.nearby)
  app.post(
    '/gyms',
    { onRequest: [verifyUserRole('ADMIN')] },
    gymsController.create,
  )
}
