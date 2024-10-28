import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface AnswerAttachmentProps {
  answerID: UniqueEntityID
  attachmentID: UniqueEntityID
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerID() {
    return this.props.answerID
  }

  get attachmentID() {
    return this.props.attachmentID
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntityID) {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}
