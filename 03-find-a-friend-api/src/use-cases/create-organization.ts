import { AddressRepository } from '@/repositories/address-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  owner_name: string
  phone?: string | null
  email: string
  address_id: string
  password: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(
    private addressRepository: AddressRepository,
    private organizationRepository: OrganizationsRepository,
  ) {}

  async execute({
    address_id,
    email,
    name,
    owner_name,
    phone,
    password,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const address = await this.addressRepository.getById(address_id)
    const password_hash = await hash(password, 6)

    if (!address) {
      throw new ResourceNotFoundError()
    }

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new InvalidCredentialsError()
    }

    const organization = await this.organizationRepository.create({
      email,
      name,
      address_id,
      owner_name,
      phone,
      password: password_hash,
    })

    return { organization }
  }
}
