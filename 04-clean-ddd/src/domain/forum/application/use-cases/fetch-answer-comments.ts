import { AnswerComment } from '../../enterprise/entities/answer-comments'
import {
  AnswerCommentsRepository,
} from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsUseCaseRequest {
  answerID: string,
  page: number
}

interface FetchAnswerCommentsUseCaseResponse {
  answerComments: AnswerComment[]
}

export class FetchAnswerCommentsUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    answerID,
    page,
  }: FetchAnswerCommentsUseCaseRequest)
    : Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.answerCommentsRepository
      .findManyByAnswerID(answerID, { page })

    return { answerComments }
  }
}
