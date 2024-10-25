import { FastifyInstance } from 'fastify'
import { OrganizationController } from './organization-controller'

const organizationController = new OrganizationController()

export async function organizationRoutes(app: FastifyInstance) {
  app.post('/organizations', organizationController.create)
  app.post('/organizations/sessions', organizationController.authenticate)
}
