import { PrismaOrganizationsRepository } from '@/repositories/prisma/organizations-prisma-repository'
import { CreateOrganizationUseCase } from '../create-organization-use-case'

export function makeCreateOrganizationUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreateOrganizationUseCase(organizationsRepository)

  return useCase
}
