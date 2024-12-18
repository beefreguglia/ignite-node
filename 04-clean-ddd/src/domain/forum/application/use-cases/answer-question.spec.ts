import { describe, expect, it, beforeEach } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'
import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  InMemoryAnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersAttachmentsRepository:
InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // System under test

describe('Create question', () => {
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
      instructorID: '1',
      questionID: '1',
      content: 'Nova resposta',
      attachmentsIDs: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems)
      .toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems)
      .toEqual([
        expect.objectContaining({ attachmentID: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentID: new UniqueEntityID('2') }),
      ])
  })
})
