import { describe, expect, it, beforeEach } from 'vitest'
import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { makeAnswer } from '@/../test/factories/make-answer'
import { NotAllowedError } from '../../../../core/errors/errors/not-allowed-error'
import { InMemoryAnswerAttachmentsRepository } from '@/../test/repositories/in-memory-answer-attachments-repository'
import { makeAnswerAttachment } from '@/../test/factories/make-answer-attachment'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
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
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)

    inMemoryAnswersAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeAnswerAttachment({
        answerId: answer.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-1'),
    )

    await inMemoryAnswersRepository.create(answer)
    const result = await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
