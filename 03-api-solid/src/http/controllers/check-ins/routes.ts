import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { FastifyInstance } from 'fastify'
import { CheckInsController } from './check-ins-controller'

const checkInsController = new CheckInsController()

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', checkInsController.history)
  app.get('/check-ins/metrics', checkInsController.metrics)
  app.post('/gyms/:gymId/check-ins', checkInsController.create)
  app.patch('/check-ins/:checkInId/validate', checkInsController.validate)
}
