import {
  PaginationParams,
} from '../../../../core/repositories/pagination-params'
import { QuestionComment } from '../../enterprise/entities/question-comments'

export interface QuestionCommentsRepository {
  findByID(id: string): Promise<QuestionComment | null>
  findManyByQuestionID(
    id: string,
    params: PaginationParams
  ): Promise<QuestionComment[]>
  create(questionComment: QuestionComment): Promise<void>
  delete(questionComment: QuestionComment): Promise<void>
}
