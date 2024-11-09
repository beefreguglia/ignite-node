import { describe, expect, it, beforeEach } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '../../../../core/entities/unique-entity-id'
import { InMemoryAnswerAttachmentsRepository } from '@/../test/repositories/in-memory-answer-attachments-repository'
import { makeAnswer } from 'test/factories/make-answer'
import { makeAnswerAttachment } from 'test/factories/make-answer-attachment'

let inMemoryAnswersAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // System under test

describe('Answer a question', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'Nova resposta',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(
      inMemoryAnswersRepository.items[0].attachments.currentItems,
    ).toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems).toEqual(
      [
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ],
    )
  })

  it('should persist attachments when creating an answer', async () => {
    const result = await sut.execute({
      authorId: '1',
      questionId: '1',
      content: 'answer content',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryAnswersAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('2'),
        }),
      ]),
    )
  })
})
