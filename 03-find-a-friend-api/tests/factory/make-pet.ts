import { faker } from '@faker-js/faker'
import { randomUUID } from 'node:crypto'

type Overwrite = {
  organization_id?: string
  age?: number
  size?: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level?: 'VERY_LOW' | 'LOW' | 'MEDIUM' | 'HIGH' | 'VERY_HIGH'
  environment?: 'SMALL' | 'MEDIUM' | 'LARGE'
  depends?: 'SMALL' | 'MEDIUM' | 'HIGH'
}

export function makePet(overwrite?: Overwrite) {
  return {
    id: randomUUID(),
    organization_id: overwrite?.organization_id ?? crypto.randomUUID(),
    name: faker.animal.dog(),
    description: faker.lorem.paragraph(),
    image: faker.image.avatarGitHub(),
    age: overwrite?.age ?? faker.number.int(),
    size:
      overwrite?.size ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
    depends:
      overwrite?.depends ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'HIGH']),
    energy_level:
      overwrite?.energy_level ??
      faker.helpers.arrayElement([
        'VERY_LOW',
        'LOW',
        'MEDIUM',
        'HIGH',
        'VERY_HIGH',
      ]),
    environment:
      overwrite?.environment ??
      faker.helpers.arrayElement(['SMALL', 'MEDIUM', 'LARGE']),
  }
}