import dayjs from 'dayjs'

import { Slug } from './value-objects/slug'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Optional } from '../../../../core/types/optional'
import { AggregateRoot } from '../../../../core/entities/aggregate-root'
import { QuestionAttachment } from './question-attachment'

export interface QuestionProps {
  authorID: UniqueEntityID
  bestAnswerID?: UniqueEntityID
  title: string
  content: string
  slug: Slug
  attachments: QuestionAttachment[]
  createdAt: Date
  updatedAt?: Date
}

export class Question extends AggregateRoot<QuestionProps> {
  get authorID() {
    return this.props.authorID
  }

  get bestAnswerID() {
    return this.props.bestAnswerID
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get slug() {
    return this.props.slug
  }

  get attachments() {
    return this.props.attachments
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

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set attachments(attachments: QuestionAttachment[]) {
    this.props.attachments = attachments
  }

  set bestAnswerID(bestAnswerID: UniqueEntityID | undefined) {
    this.props.bestAnswerID = bestAnswerID
    this.touch()
  }

  static create(
    props: Optional<QuestionProps, 'createdAt' | 'slug' | 'attachments'>,
    id?: UniqueEntityID,
  ) {
    const question = new Question({
      ...props,
      slug: props.slug ?? Slug.createFromText(props.title),
      attachments: props.attachments ?? [],
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return question
  }
}
