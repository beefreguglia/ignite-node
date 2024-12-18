import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find((org) => org.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async findById(id: string): Promise<Organization | null> {
    const organization = this.organizations.find((org) => org.id === id)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(
    data: Prisma.OrganizationUncheckedCreateInput,
  ): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      owner_name: data.owner_name,
      city: data.city,
      complement: data.complement ?? null,
      neighborhood: data.neighborhood,
      number: data.number ?? null,
      state: data.state,
      street: data.street,
      cep: data.cep,
      created_at: new Date(),
      updated_at: null,
    }

    this.organizations.push(organization)

    return organization
  }
}
