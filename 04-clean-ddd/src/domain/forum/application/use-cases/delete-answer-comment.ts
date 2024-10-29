import { Either, left, right } from '../../../../core/either'
import {
  AnswerCommentsRepository,
} from '../repositories/answer-comments-repository'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'
import {
  ResourceNotFoundError,
} from '../../../../core/errors/errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  authorID: string
  answerCommentID: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this
      .answerCommentsRepository.findByID(answerCommentID)

    if (!answerComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== answerComment.authorID.toString()) {
      return left(new NotAllowedError())
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right(null)
  }
}
