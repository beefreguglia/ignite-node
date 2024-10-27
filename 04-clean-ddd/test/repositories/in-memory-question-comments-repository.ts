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

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }
}
