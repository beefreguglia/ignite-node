import { Organization, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationsRepository
  implements OrganizationsRepository
{
  public organizations: Organization[] = []

  async findByEmail(email: string): Promise<Organization | null> {
    const organization = this.organizations.find((item) => item.email === email)

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
      phone: data.phone ?? null,
      owner_name: data.owner_name,
      city: data.city,
      complement: data.complement ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toLocaleString()),
      neighborhood: data.neighborhood,
      number: data.number ?? null,
      state: data.state,
      street: data.street,
      created_at: new Date(),
      updated_at: null,
    }

    this.organizations.push(organization)

    return organization
  }
}