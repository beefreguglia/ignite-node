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

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }
}
