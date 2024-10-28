import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  QuestionAttachment,
  QuestionAttachmentProps,
} from '../../src/domain/forum/enterprise/entities/question-attachment'

export function makeQuestionAttachment(
  override?: Partial<QuestionAttachmentProps>,
  id?: UniqueEntityID,
) {
  const questionAttachment = QuestionAttachment.create({
    questionID: new UniqueEntityID(faker.string.uuid()),
    attachmentID: new UniqueEntityID(faker.string.uuid()),
    ...override,
  }, id)

  return questionAttachment
}
