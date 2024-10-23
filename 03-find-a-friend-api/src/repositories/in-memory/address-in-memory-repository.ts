import { Prisma, Address } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { AddressRepository } from '../address-repository'

export class InMemoryAddressRepository implements AddressRepository {
  public addresses: Address[] = []

  async create(data: Prisma.AddressCreateInput): Promise<Address> {
    const address: Address = {
      id: randomUUID(),
      street: data.street,
      neighborhood: data.neighborhood,
      number: data.number ?? null,
      complement: data.complement ?? null,
      city: data.city,
      state: data.state,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.addresses.push(address)

    return address
  }
}
