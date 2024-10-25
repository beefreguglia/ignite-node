import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { Organization } from '@prisma/client'
import { hash } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface CreateOrganizationUseCaseRequest {
  name: string
  owner_name: string
  phone: string
  email: string
  password: string
  street: string
  number?: number
  complement?: string
  city: string
  state: string
  neighborhood: string
  cep: string
}

interface CreateOrganizationUseCaseResponse {
  organization: Organization
}

export class CreateOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    email,
    name,
    owner_name,
    phone,
    password,
    city,
    neighborhood,
    state,
    street,
    complement,
    number,
    cep,
  }: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email)

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationRepository.create({
      email,
      name,
      owner_name,
      phone,
      password: password_hash,
      city,
      neighborhood,
      state,
      street,
      complement,
      number,
      cep,
    })

    return { organization }
  }
}
