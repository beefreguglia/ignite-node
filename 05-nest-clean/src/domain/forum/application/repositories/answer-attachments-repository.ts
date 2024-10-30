import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'

export interface AnswerAttachmentsRepository {
  findManyByAnswerID(answerID: string): Promise<AnswerAttachment[]>
  deleteManyByAnswerID(answerID: string): Promise<void>
}
