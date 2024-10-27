import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorID: string
  answerID: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorID,
    answerID,
  }: ChooseQuestionBestAnswerUseCaseRequest)
    : Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionsRepository
      .findByID(answer.questionID.toString())

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    question.bestAnswerID = answer.id

    await this.questionsRepository.save(question)

    return { question }
  }
}
