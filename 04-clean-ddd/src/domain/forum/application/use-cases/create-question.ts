import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorID: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    content,
    title,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorID: new UniqueEntityID(authorID),
      content,
      title,
    })

    await this.questionsRepository.create(question)

    return { question }
  }
}
