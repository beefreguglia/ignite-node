import { Either, right } from '../../../../core/either'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { Question } from '../../enterprise/entities/question'
import {
  QuestionAttachment,
} from '../../enterprise/entities/question-attachment'
import {
  QuestionAttachmentList,
} from '../../enterprise/entities/question-attachment-list'
import { QuestionsRepository } from '../repositories/questions-repository'

interface CreateQuestionUseCaseRequest {
  authorID: string
  title: string
  content: string
  attachmentsIDs: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question
  }
>

export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    content,
    title,
    attachmentsIDs,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorID: new UniqueEntityID(authorID),
      content,
      title,
    })

    const questionAttachments = attachmentsIDs.map((attachmentID) => {
      return QuestionAttachment.create({
        attachmentID: new UniqueEntityID(attachmentID),
        questionID: question.id,
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionsRepository.create(question)

    return right({ question })
  }
}
