import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import { EditAnswerUseCase } from './edit-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'
import {
  InMemoryAnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-answer-attachments-repository'
import {
  makeAnswerAttachment,
} from '../../../../../test/factories/make-answer-attachment'

let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit answer', () => {
  beforeEach(() => {
    inMemoryAnswerAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )
    sut = new EditAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerAttachmentsRepository,
    )
  })

  it('should be able to edit a answer', async () => {
    const newAnswer = makeAnswer(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    inMemoryAnswerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerID: newAnswer.id,
        attachmentID: new UniqueEntityID('1'),
      }),
      makeAnswerAttachment({
        answerID: newAnswer.id,
        attachmentID: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      answerID: newAnswer.id.toValue(),
      authorID: 'author-1',
      content: 'Conteúdo teste',
      attachmentsIDs: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Conteúdo teste',
    })
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems)
      .toHaveLength(2)
    expect(inMemoryAnswersRepository.items[0].attachments.currentItems)
      .toEqual([
        expect.objectContaining({ attachmentID: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentID: new UniqueEntityID('3') }),
      ])
  })

  it('should not be able to edit a answer from another user', async () => {
    const newAnswer = makeAnswer(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('answer-1'),
    )

    await inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      answerID: newAnswer.id.toValue(),
      authorID: 'author-2',
      content: 'Conteúdo teste',
      attachmentsIDs: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
