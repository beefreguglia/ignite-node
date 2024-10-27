import dayjs from 'dayjs'

import { Entity } from '../../../../core/entities/entity'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'

export interface AnswerProps {
  authorID: UniqueEntityID
  questionID: UniqueEntityID
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps> {
  get authorID() {
    return this.props.authorID
  }

  get questionID() {
    return this.props.questionID
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.createdAt, 'days') <= 3
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<AnswerProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const answer = new Answer({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return answer
  }
}
