import { PaginationParams } from '../../src/core/repositories/pagination-params'
import {
  QuestionCommentsRepository,
} from
  '../../src/domain/forum/application/repositories/question-comments-repository'
import {
  QuestionComment,
} from '../../src/domain/forum/enterprise/entities/question-comments'

export class InMemoryQuestionCommentsRepository
implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async findByID(id: string): Promise<QuestionComment | null> {
    const questionComment = this
      .items.find((item) => item.id.toString() === id)

    if (!questionComment) {
      return null
    }

    return questionComment
  }

  async findManyByQuestionID(
    questionID: string,
    { page }: PaginationParams,
  ): Promise<QuestionComment[]> {
    const questionComments = this.items
      .filter((item) => item.questionID.toString() === questionID)
      .slice((page - 1) * 20, page * 20)

    return questionComments
  }

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async delete(answer: QuestionComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }
}
