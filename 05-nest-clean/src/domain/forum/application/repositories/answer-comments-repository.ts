import { PaginationParams } from '../../../../core/repositories/pagination-params'
import { AnswerComment } from '../../enterprise/entities/answer-comments'

export interface AnswerCommentsRepository {
  findByID(id: string): Promise<AnswerComment | null>
  findManyByAnswerID(
    id: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]>
  create(answerComment: AnswerComment): Promise<void>
  delete(answerComment: AnswerComment): Promise<void>
}
