import { PrismaService } from '../prisma.service'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { PrismaAnswerAttachmentMapper } from '../mappers/prisma-answer-attachment-mapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      // eslint-disable-next-line no-useless-return
      return
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments)

    await this.prisma.attachment.updateMany(data)
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      // eslint-disable-next-line no-useless-return
      return
    }

    const attachmentIds = attachments.map((attachment) =>
      attachment.id.toString(),
    )

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    })
  }

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answerId,
      },
    })

    return answerAttachments.map((answerAttachment) =>
      PrismaAnswerAttachmentMapper.toDomain(answerAttachment),
    )
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answerId,
      },
    })
  }
}
