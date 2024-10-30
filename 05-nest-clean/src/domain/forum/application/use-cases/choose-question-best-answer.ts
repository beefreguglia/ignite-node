import { Either, left, right } from '../../../../core/either'
import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../core/errors/errors/resource-not-found-error'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorID: string
  answerID: string
}

type ChooseQuestionBestAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    authorID,
    answerID,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    const question = await this.questionsRepository.findByID(
      answer.questionID.toString(),
    )

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== question.authorID.toString()) {
      return left(new NotAllowedError())
    }

    question.bestAnswerID = answer.id

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
