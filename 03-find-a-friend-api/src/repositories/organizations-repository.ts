import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  findByEmail(email: string): Promise<Organization | null>
  create(data: Prisma.OrganizationUncheckedCreateInput): Promise<Organization>
}
