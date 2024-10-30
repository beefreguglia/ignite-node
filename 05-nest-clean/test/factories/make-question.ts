import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '../../src/domain/forum/enterprise/entities/question'

export function makeQuestion(
  override?: Partial<QuestionProps>,
  id?: UniqueEntityID,
) {
  const question = Question.create(
    {
      authorID: new UniqueEntityID(faker.string.uuid()),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return question
}
