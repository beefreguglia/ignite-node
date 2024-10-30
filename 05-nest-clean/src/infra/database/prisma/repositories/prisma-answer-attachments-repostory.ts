import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerID(answerID: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByAnswerID(answerID: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
