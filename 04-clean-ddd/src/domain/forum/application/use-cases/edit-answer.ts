import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  authorID: string
  answerID: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    authorID,
    answerID,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorID !== answer.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    answer.content = content

    const editedAnswer = await this.answersRepository.save(answer)

    return { answer: editedAnswer }
  }
}
