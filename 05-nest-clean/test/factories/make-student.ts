import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  Student,
  StudentProps,
} from '../../src/domain/forum/enterprise/entities/student'

export function makeStudent(
  override?: Partial<StudentProps>,
  id?: UniqueEntityId,
) {
  const student = Student.create(
    {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return student
}
