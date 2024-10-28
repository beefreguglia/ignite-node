import { Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import {
  AnswerAttachmentList,
} from '../../enterprise/entities/answer-attachment-list'
import { AnswersRepository } from '../repositories/answers-repository'

interface AnswerQuestionUseCaseRequest {
  instructorID: string
  questionID: string
  content: string
  attachmentsIDs: string[]
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answersRepository: AnswersRepository) {}

  async execute({
    instructorID,
    questionID,
    content,
    attachmentsIDs,
  }: AnswerQuestionUseCaseRequest): Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorID: new UniqueEntityID(instructorID),
      questionID: new UniqueEntityID(questionID),
    })

    const answerAttachments = attachmentsIDs.map((attachmentID) => {
      return AnswerAttachment.create({
        attachmentID: new UniqueEntityID(attachmentID),
        answerID: answer.id,
      })
    })

    answer.attachments = new AnswerAttachmentList(answerAttachments)

    await this.answersRepository.create(answer)

    return right({ answer })
  }
}
