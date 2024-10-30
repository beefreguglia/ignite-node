import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { Comment, CommentProps } from './comments'

export interface AnswerCommentProps extends CommentProps {
  answerID: UniqueEntityID
}

export class AnswerComment extends Comment<AnswerCommentProps> {
  get answerID() {
    return this.props.answerID
  }

  static create(
    props: Optional<AnswerCommentProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
