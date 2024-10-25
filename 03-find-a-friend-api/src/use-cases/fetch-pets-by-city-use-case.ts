import { PetsRepository } from '@/repositories/pets-repository'
import { Depends, EnergyLevel, Pet, Size, Environment } from '@prisma/client'

interface FetchPetsByCityUseCaseRequest {
  city: string
  age?: string
  size?: Size
  energy_level?: EnergyLevel
  environment?: Environment
  depends?: Depends
}

interface FetchPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    energy_level,
    environment,
    size,
    depends,
  }: FetchPetsByCityUseCaseRequest): Promise<FetchPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findAll({
      city,
      age,
      energy_level,
      environment,
      size,
      depends,
    })

    return { pets }
  }
}
