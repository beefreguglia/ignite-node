import { Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { AnswerComment } from '../../enterprise/entities/answer-comments'
import {
  AnswerCommentsRepository,
} from '../repositories/answer-comments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  ResourceNotFoundError,
} from '../../../../core/errors/errors/resource-not-found-error'

interface CommentOnAnswerUseCaseRequest {
  authorID: string
  answerID: string
  content: string
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment
  }
>

export class CommentOnAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerCommentsRepository: AnswerCommentsRepository,
  ) {}

  async execute({
    authorID,
    answerID,
    content,
  }: CommentOnAnswerUseCaseRequest)
    : Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const answerComment = AnswerComment.create({
      authorID: new UniqueEntityID(authorID),
      answerID: new UniqueEntityID(answerID),
      content,
    })

    await this.answerCommentsRepository.create(answerComment)

    return right({ answerComment })
  }
}
