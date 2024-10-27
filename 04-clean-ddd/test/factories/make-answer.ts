import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  Answer,
  AnswerProps,
} from '../../src/domain/forum/enterprise/entities/answer'

export function makeAnswer(
  override: Partial<AnswerProps>,
  id?: UniqueEntityId,
) {
  const answer = Answer.create({
    authorId: new UniqueEntityId(faker.string.uuid()),
    questionId: new UniqueEntityId(faker.string.uuid()),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return answer
}
