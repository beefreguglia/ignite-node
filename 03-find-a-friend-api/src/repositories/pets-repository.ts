import { Depends, EnergyLevel, Pet, Prisma, Size } from '@prisma/client'
import { Environment } from 'vitest'

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
