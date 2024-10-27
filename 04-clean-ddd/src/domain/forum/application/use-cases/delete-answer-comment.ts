import {
  AnswerCommentsRepository,
} from '../repositories/answer-comments-repository'

interface DeleteAnswerUseCaseRequest {
  authorID: string
  answerCommentID: string
}

// interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerCommentUseCase {
  constructor(private answerCommentsRepository: AnswerCommentsRepository) {}

  async execute({
    authorID,
    answerCommentID,
  }: DeleteAnswerUseCaseRequest) {
    const answerComment = await this
      .answerCommentsRepository.findByID(answerCommentID)

    if (!answerComment) {
      throw new Error('Answer comment not found.')
    }

    if (authorID !== answerComment.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    await this.answerCommentsRepository.delete(answerComment)
  }
}
