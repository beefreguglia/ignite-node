import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overwrite = {
  email?: string
  password?: string
  city?: string
  complement?: string
}

export function makeOrganization(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    email: overwrite?.email ?? faker.internet.email(),
    cep: faker.location.zipCode(),
    password: overwrite?.password ?? faker.internet.password(),
    name: faker.company.name(),
    phone: faker.phone.number(),
    owner_name: faker.person.fullName(),
    city: overwrite?.city ?? faker.location.city(),
    complement: overwrite?.complement,
    neighborhood: faker.location.streetAddress(),
    number: Number(faker.location.buildingNumber()),
    state: faker.location.state(),
    street: faker.location.street(),
  }
}
