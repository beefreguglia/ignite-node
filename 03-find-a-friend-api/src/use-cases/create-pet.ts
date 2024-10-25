import { PetsRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'

interface CreatePetUseCaseRequest {
  age: number
  depends: 'SMALL' | 'MEDIUM' | 'HIGH'
  energy_level: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  description: string
  image: string
  name: string
  organizationId: string
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  space: 'SMALL' | 'MEDIUM' | 'LARGE'
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
    organizationId,
    size,
    space,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const pet = await this.petRepository.create({
      age,
      depends,
      description,
      energy_level,
      image,
      name,
      organizationId,
      size,
      space,
    })

    return { pet }
  }
}
