import { Either, left, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import {
  AnswerAttachmentList,
} from '../../enterprise/entities/answer-attachment-list'
import {
  AnswerAttachmentsRepository,
} from '../repositories/answer-attachments-repository'
import { AnswersRepository } from '../repositories/answers-repository'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'
import {
  ResourceNotFoundError,
} from '../../../../core/errors/errors/resource-not-found-error'

interface EditAnswerUseCaseRequest {
  authorID: string
  answerID: string
  content: string
  attachmentsIDs: string[]
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answersRepository: AnswersRepository,
    private answerAttachmentsRepository: AnswerAttachmentsRepository,
  ) {}

  async execute({
    authorID,
    answerID,
    content,
    attachmentsIDs,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findByID(answerID)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorID !== answer.authorID.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments = await this.answerAttachmentsRepository
      .findManyByAnswerID(answerID)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIDs.map((attachmentsID) => {
      return AnswerAttachment.create({
        attachmentID: new UniqueEntityID(attachmentsID),
        answerID: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.content = content
    answer.attachments = answerAttachmentList

    const editedAnswer = await this.answersRepository.save(answer)

    return right({ answer: editedAnswer })
  }
}
