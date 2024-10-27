import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override?: Partial<AnswerProps>,
  id?: UniqueEntityID,
) {
  const answer = Answer.create({
    authorID: new UniqueEntityID(faker.string.uuid()),
    questionID: new UniqueEntityID(faker.string.uuid()),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return answer
}
