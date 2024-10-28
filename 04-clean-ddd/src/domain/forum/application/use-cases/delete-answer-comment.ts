import { Either, left, right } from '../../../../core/either'
import {
  AnswerCommentsRepository,
} from '../repositories/answer-comments-repository'

interface DeleteAnswerUseCaseRequest {
  authorID: string
  answerCommentID: string
}

type DeleteAnswerUseCaseResponse = Either<string, object>

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answerComment = await this
      .answerCommentsRepository.findByID(answerCommentID)

    if (!answerComment) {
      return left('Answer comment not found.')
    }

    if (authorID !== answerComment.authorID.toString()) {
      return left('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)

    return right({})
  }
}
