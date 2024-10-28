import {
  QuestionAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../src/domain/forum/application/repositories/question-attachments-repository'
import {
  QuestionAttachment,
} from '../../src/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
implements QuestionAttachmentsRepository {
  public items: QuestionAttachment[] = []

  async findManyByQuestionID(
    questionID: string,
  ): Promise<QuestionAttachment[]> {
    const questionAttachment = this.items
      .filter((item) => item.questionID.toString() === questionID)

    return questionAttachment
  }
}
