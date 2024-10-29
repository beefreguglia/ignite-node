import { DomainEvents } from '../../src/core/events/domain-events'
import { PaginationParams } from '../../src/core/repositories/pagination-params'
import {
  AnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../src/domain/forum/application/repositories/answer-attachments-repository'
import {
  AnswersRepository,
} from '../../src/domain/forum/application/repositories/answers-repository'
import { Answer } from '../../src/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  constructor(
    private answerAttachmentsRepository
    : AnswerAttachmentsRepository,
  ) {}

  async findByID(id: string): Promise<Answer | null> {
    const answer = this
      .items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async findManyByQuestionID(
    questionID: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionID.toString() === questionID)
      .slice((page - 1) * 20, page * 20)

    return answers
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)

    DomainEvents.dispatchEventsForAggregate(answer.id)
  }

  async save(answer: Answer): Promise<Answer> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items[itemIndex] = answer

    DomainEvents.dispatchEventsForAggregate(answer.id)

    return answer
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(itemIndex, 1)

    this.answerAttachmentsRepository.deleteManyByAnswerID(
      answer.id.toString(),
    )
  }
}
