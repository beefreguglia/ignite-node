import { Prisma, Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationRepository } from '../organization-repository'

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public organizations: Organization[] = []

  async create(
    data: Prisma.OrganizationCreateInput,
    addressId: string,
  ): Promise<Organization> {
    const organization: Organization = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      phone: data.phone ?? null,
      owner_name: data.owner_name,
      addressId,
      created_at: new Date(),
      updated_at: null,
    }

    this.organizations.push(organization)

    return organization
  }
}
