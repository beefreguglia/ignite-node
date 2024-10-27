import { AnswersRepository } from '../repositories/answers-repository'

interface DeleteAnswerUseCaseRequest {
  authorID: string
  answerID: string
}

// interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorID,
    answerID,
  }: DeleteAnswerUseCaseRequest) {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorID !== answer.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answersRepository.delete(answer)
  }
}
