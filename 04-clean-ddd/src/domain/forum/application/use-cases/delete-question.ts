import { QuestionsRepository } from '../repositories/questions-repository'

interface DeleteQuestionUseCaseRequest {
  authorID: string
  questionID: string
}

// interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    questionID,
  }: DeleteQuestionUseCaseRequest) {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionsRepository.delete(question)
  }
}
