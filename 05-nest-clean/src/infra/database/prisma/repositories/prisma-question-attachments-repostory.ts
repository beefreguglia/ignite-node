import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class PrismaQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionID(questionID: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.')
  }

  deleteManyByQuestionID(questionID: string): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
