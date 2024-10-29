import { Either, left, right } from '../../../../core/either'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'
import {
  ResourceNotFoundError,
} from '../../../../core/errors/errors/resource-not-found-error'

interface DeleteAnswerUseCaseRequest {
  authorID: string
  answerID: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorID,
    answerID,
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== answer.authorID.toString()) {
      return left(new NotAllowedError())
    }

    await this.answersRepository.delete(answer)

    return right(null)
  }
}
