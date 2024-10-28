import { Either, left, right } from '../../../../core/either'
import {
  QuestionCommentsRepository,
} from '../repositories/question-comments-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteQuestionUseCaseRequest {
  authorID: string
  questionCommentID: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorID,
    questionCommentID,
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {
    const questionComment = await this.questionCommentsRepository
      .findByID(questionCommentID)

    if (!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== questionComment.authorID.toString()) {
      return left(new NotAllowedError())
    }

    await this.questionCommentsRepository.delete(questionComment)

    return right(null)
  }
}
