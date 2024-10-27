import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface FetchQuestionAnswersUseCaseRequest {
  questionID: string,
  page: number
}

interface FetchQuestionAnswersUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswersUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    questionID,
    page,
  }: FetchQuestionAnswersUseCaseRequest)
    : Promise<FetchQuestionAnswersUseCaseResponse> {
    const answers = await this.answersRepository
      .findManyByQuestionID(questionID, { page })

    return { answers }
  }
}
