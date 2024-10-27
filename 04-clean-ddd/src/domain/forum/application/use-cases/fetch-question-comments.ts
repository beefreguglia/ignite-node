import { QuestionComment } from '../../enterprise/entities/question-comments'
import {
  QuestionCommentsRepository,
} from '../repositories/question-comments-repository'

interface FetchQuestionCommentsUseCaseRequest {
  questionID: string,
  page: number
}

interface FetchQuestionCommentsUseCaseResponse {
  questionComments: QuestionComment[]
}

export class FetchQuestionCommentsUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    questionID,
    page,
  }: FetchQuestionCommentsUseCaseRequest)
    : Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentsRepository
      .findManyByQuestionID(questionID, { page })

    return { questionComments }
  }
}
