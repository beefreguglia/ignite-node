import { PrismaPetsRepository } from '@/repositories/prisma/pets-prisma-repository'
import { CreatePetUseCase } from '../create-pet-use-case'

export function makeCreatePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new CreatePetUseCase(petsRepository)

  return useCase
}
