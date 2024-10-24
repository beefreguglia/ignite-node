import { Organization } from '@prisma/client'

export interface CreateProps {
  id?: string
  name: string
  owner_name: string
  phone?: string | null
  email: string
  created_at?: Date | string
  updated_at?: Date | string | null
  address_id: string
  password: string
}

export interface OrganizationsRepository {
  create(data: CreateProps): Promise<Organization>
  findByEmail(email: string): Promise<Organization | null>
}
