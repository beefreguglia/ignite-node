import { Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import {
  CreateProps,
  OrganizationsRepository,
} from '../organizations-repository'

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

  async create(data: CreateProps): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone ?? null,
      owner_name: data.owner_name,
      addressId: data.address_id,
      created_at: new Date(),
      updated_at: null,
    }

    this.organizations.push(organization)

    return organization
  }
}
