import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

export interface QuestionAttachmentProps {
  questionID: UniqueEntityID
  attachmentID: UniqueEntityID
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionID() {
    return this.props.questionID
  }

  get attachmentID() {
    return this.props.attachmentID
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntityID) {
    const questionAttachment = new QuestionAttachment(props, id)

    return questionAttachment
  }
}
