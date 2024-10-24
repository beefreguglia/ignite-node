import { Address, Prisma } from '@prisma/client'

export interface AddressRepository {
  getById(id: string): Promise<Address | null>
  create(data: Prisma.AddressCreateInput): Promise<Address>
}
