import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorID: string
  questionID: string
  content: string
}

interface AnswerQuestionUseCaseResponse {
  answer: Answer
}

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorID,
    questionID, content,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID),
    })

    await this.answersRepository.create(answer)

    return { answer }
  }
}
