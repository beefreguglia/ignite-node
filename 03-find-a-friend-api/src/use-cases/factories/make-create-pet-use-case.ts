import { PrismaPetsRepository } from '@/repositories/prisma/pets-prisma-repository'
import { CreatePetUseCase } from '../create-pet-use-case'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/organizations-prisma-repository'

export function makeCreatePetUseCase() {
  const organizationsRepository = new PrismaOrganizationsRepository()
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(organizationsRepository, petsRepository)

  return useCase
}
