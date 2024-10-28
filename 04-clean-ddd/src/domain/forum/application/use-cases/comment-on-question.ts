import { Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { QuestionComment } from '../../enterprise/entities/question-comments'
import {
  QuestionCommentsRepository,
} from '../repositories/question-comments-repository'
import { QuestionsRepository } from '../repositories/questions-repository'
import { ResourceNotFoundError } from './errors/resourse-not-found-error'

interface CommentOnQuestionUseCaseRequest {
  authorID: string
  questionID: string
  content: string
}

type CommentOnQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    questionComment: QuestionComment
  }
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionCommentsRepository: QuestionCommentsRepository,
  ) {}

  async execute({
    authorID,
    questionID,
    content,
  }: CommentOnQuestionUseCaseRequest)
    : Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorID: new UniqueEntityID(authorID),
      questionID: new UniqueEntityID(questionID),
      content,
    })

    await this.questionCommentsRepository.create(questionComment)

    return right({ questionComment })
  }
}
