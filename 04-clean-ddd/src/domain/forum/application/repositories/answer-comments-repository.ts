import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  findByID(id: string): Promise<AnswerComment | null>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
