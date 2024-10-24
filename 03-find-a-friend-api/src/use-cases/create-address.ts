import { AddressRepository } from '@/repositories/address-repository'
import { Address } from '@prisma/client'

interface CreateAddressUseCaseRequest {
  city: string
  state: string
  street: string
  neighborhood: string
  complement: string | null
  number: number | null
  latitude: number
  longitude: number
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    city,
    complement,
    latitude,
    longitude,
    neighborhood,
    number,
    state,
    street,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const address = await this.addressRepository.create({
      city,
      complement,
      latitude,
      longitude,
      neighborhood,
      number,
      state,
      street,
    })

    return { address }
  }
}
