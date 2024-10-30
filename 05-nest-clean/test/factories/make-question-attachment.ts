import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '../../src/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override?: Partial<QuestionAttachmentProps>,
  id?: UniqueEntityId,
) {
  const questionAttachment = QuestionAttachment.create(
    {
      questionId: new UniqueEntityId(faker.string.uuid()),
      attachmentId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return questionAttachment
}
