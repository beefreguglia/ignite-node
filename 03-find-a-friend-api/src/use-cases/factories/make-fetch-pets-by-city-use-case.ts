import { PrismaPetsRepository } from '@/repositories/prisma/pets-prisma-repository'
import { FetchPetsByCityUseCase } from '../fetch-pets-by-city-use-case'

export function makeFetchPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsByCityUseCase(petsRepository)

  return useCase
}
