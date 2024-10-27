import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  AnswerComment,
  AnswerCommentProps,
} from '../../src/domain/forum/enterprise/entities/answer-comments'

export function makeAnswerComment(
  override?: Partial<AnswerCommentProps>,
  id?: UniqueEntityID,
) {
  const answerComment = AnswerComment.create({
    authorID: new UniqueEntityID(faker.string.uuid()),
    answerID: new UniqueEntityID(faker.string.uuid()),
    content: faker.lorem.text(),
    ...override,
  }, id)

  return answerComment
}
