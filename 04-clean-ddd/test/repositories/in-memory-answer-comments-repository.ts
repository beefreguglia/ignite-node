import { PaginationParams } from '../../src/core/repositories/pagination-params'
import {
  AnswerCommentsRepository,
} from
  '../../src/domain/forum/application/repositories/answer-comments-repository'
import {
  AnswerComment,
} from '../../src/domain/forum/enterprise/entities/answer-comments'

export class InMemoryAnswerCommentsRepository
implements AnswerCommentsRepository {
  public items: AnswerComment[] = []

  async findByID(id: string): Promise<AnswerComment | null> {
    const answerComment = this
      .items.find((item) => item.id.toString() === id)

    if (!answerComment) {
      return null
    }

    return answerComment
  }

  async findManyByAnswerID(
    answerID: string,
    { page }: PaginationParams,
  ): Promise<AnswerComment[]> {
    const answerComments = this.items
      .filter((item) => item.answerID.toString() === answerID)
      .slice((page - 1) * 20, page * 20)

    return answerComments
  }

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async delete(answer: AnswerComment): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }
}
