import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { CheckInsController } from './check-ins-controller'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'

const checkInsController = new CheckInsController()

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', checkInsController.history)
  app.get('/check-ins/metrics', checkInsController.metrics)
  app.post('/gyms/:gymId/check-ins', checkInsController.create)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    checkInsController.validate,
  )
}
