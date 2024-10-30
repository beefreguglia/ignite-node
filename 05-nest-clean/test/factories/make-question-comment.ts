import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  QuestionComment,
  QuestionCommentProps,
} from '../../src/domain/forum/enterprise/entities/question-comments'

export function makeQuestionComment(
  override?: Partial<QuestionCommentProps>,
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: new UniqueEntityId(faker.string.uuid()),
      questionId: new UniqueEntityId(faker.string.uuid()),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
