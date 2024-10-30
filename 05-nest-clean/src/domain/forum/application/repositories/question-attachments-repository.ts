import { QuestionAttachment } from '../../enterprise/entities/question-attachment'

export interface QuestionAttachmentsRepository {
  findManyByQuestionID(questionID: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionID(questionID: string): Promise<void>
}
