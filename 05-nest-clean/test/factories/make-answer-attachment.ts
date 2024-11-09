import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '../../src/core/entities/unique-entity-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '../../src/domain/forum/enterprise/entities/answer-attachment'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/infra/database/prisma/prisma.service'

export function makeAnswerAttachment(
  override?: Partial<AnswerAttachmentProps>,
  id?: UniqueEntityId,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntityId(faker.string.uuid()),
      attachmentId: new UniqueEntityId(faker.string.uuid()),
      ...override,
    },
    id,
  )

  return answerAttachment
}

@Injectable()
export class AnswerAttachmentFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAnswerAttachment(
    data: Partial<AnswerAttachmentProps> = {},
  ): Promise<AnswerAttachment> {
    const answerAttachment = makeAnswerAttachment(data)

    await this.prisma.attachment.update({
      where: {
        id: answerAttachment.attachmentId.toString(),
      },
      data: {
        answerId: answerAttachment.answerId.toString(),
      },
    })

    return answerAttachment
  }
}
