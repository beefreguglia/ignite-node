import {
  AnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../src/domain/forum/application/repositories/answer-attachments-repository'
import {
  AnswerAttachment,
} from '../../src/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
implements AnswerAttachmentsRepository {
  public items: AnswerAttachment[] = []

  async findManyByAnswerID(
    answerID: string,
  ): Promise<AnswerAttachment[]> {
    const answerAttachment = this.items
      .filter((item) => item.answerID.toString() === answerID)

    return answerAttachment
  }

  async deleteManyByAnswerID(answerID: string): Promise<void> {
    const answerAttachments = this.items
      .filter((item) => item.answerID.toString() !== answerID)

    this.items = answerAttachments
  }
}
