import { faker } from '@faker-js/faker'

import { UniqueEntityID } from '../../src/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '../../src/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override?: Partial<AnswerAttachmentProps>,
  id?: UniqueEntityID,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerID: new UniqueEntityID(faker.string.uuid()),
      attachmentID: new UniqueEntityID(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return answerAttachment
}
