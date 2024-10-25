import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  age: number
  depends: 'SMALL' | 'MEDIUM' | 'HIGH'
  energy_level: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  description: string
  image: string
  name: string
  organization_id: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  environment: 'SMALL' | 'MEDIUM' | 'LARGE'
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(private petRepository: PetsRepository) {}

  async execute({
    age,
    depends,
    description,
    energy_level,
    image,
    name,
    organization_id,
    size,
    environment,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepository.create({
      age,
      depends,
      description,
      energy_level,
      image,
      name,
      organization_id,
      size,
      environment,
    })

    return { pet }
  }
}
