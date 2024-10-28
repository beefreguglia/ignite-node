import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
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
let inMemoryQuestionsAttachmentsRepository
: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new EditQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionsAttachmentsRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    inMemoryQuestionsAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionID: newQuestion.id,
        attachmentID: new UniqueEntityID('1'),
      }),
      makeQuestionAttachment({
        questionID: newQuestion.id,
        attachmentID: new UniqueEntityID('2'),
      }),
    )

    const result = await sut.execute({
      questionID: newQuestion.id.toValue(),
      authorID: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      attachmentsIDs: ['1', '3'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
      .toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
      .toEqual([
        expect.objectContaining({ attachmentID: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentID: new UniqueEntityID('3') }),
      ])
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      questionID: newQuestion.id.toValue(),
      authorID: 'author-2',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
      attachmentsIDs: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
