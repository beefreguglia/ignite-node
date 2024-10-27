import {
  QuestionCommentsRepository,
} from '../repositories/question-comments-repository'

interface DeleteQuestionUseCaseRequest {
  authorID: string
  questionCommentID: string
}

// interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionCommentUseCase {
  constructor(private questionCommentsRepository: QuestionCommentsRepository) {}

  async execute({
    authorID,
    questionCommentID,
  }: DeleteQuestionUseCaseRequest) {
    const questionComment = await this.questionCommentsRepository
      .findByID(questionCommentID)

    if (!questionComment) {
      throw new Error('Question comment not found.')
    }

    if (authorID !== questionComment.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    await this.questionCommentsRepository.delete(questionComment)
  }
}
