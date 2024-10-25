import {
  Depends,
  EnergyLevel,
  Pet,
  Prisma,
  Size,
  Environment,
} from '@prisma/client'

export interface FindAllParams {
  city: string
  age?: string
  size?: Size
  energy_level?: EnergyLevel
  environment?: Environment
  depends?: Depends
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findAll(params: FindAllParams): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
