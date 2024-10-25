import { PetsRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface FetchUserCheckInsHistoryUseCaseRequest {
  city: string
}

interface FetchUserCheckInsHistoryUseCaseResponse {
  pets: Pet[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: FetchUserCheckInsHistoryUseCaseRequest): Promise<FetchUserCheckInsHistoryUseCaseResponse> {
    const pets = await this.petsRepository.findAll(city)

    return { pets }
  }
}
