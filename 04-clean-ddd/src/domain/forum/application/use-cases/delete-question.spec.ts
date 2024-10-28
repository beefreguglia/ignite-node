import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import {
  InMemoryQuestionAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-question-attachments-repository'
import {
  makeQuestionAttachment,
} from '../../../../../test/factories/make-question-attachment'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionsAttachmentsRepository:
InMemoryQuestionAttachmentsRepository

let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const question = makeQuestion({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    inMemoryQuestionsAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionID: question.id,
        attachmentID: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionID: question.id,
        attachmentID: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      questionID: 'question-1',
      authorID: 'author-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
    expect(inMemoryQuestionsAttachmentsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    const result = await sut.execute({
      questionID: 'question-1',
      authorID: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
