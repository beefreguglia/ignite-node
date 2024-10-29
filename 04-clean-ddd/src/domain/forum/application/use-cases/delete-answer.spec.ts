import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'
import {
  InMemoryAnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-answer-attachments-repository'
import {
  makeAnswerAttachment,
} from '../../../../../test/factories/make-answer-attachment'

let inMemoryAnswersAttachmentsRepository:
InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete answer', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer by id', async () => {
    const answer = makeAnswer({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    inMemoryAnswersAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerID: answer.id,
        attachmentID: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerID: answer.id,
        attachmentID: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      answerID: 'answer-1',
      authorID: 'author-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)
    const result = await sut.execute({
      answerID: 'answer-1',
      authorID: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
