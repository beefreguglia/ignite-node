import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '../../src/domain/forum/enterprise/entities/question-comments'

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityID,
) {
  const questionComment = QuestionComment.create(
    {
      authorID: new UniqueEntityID(faker.string.uuid()),
      questionID: new UniqueEntityID(faker.string.uuid()),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
