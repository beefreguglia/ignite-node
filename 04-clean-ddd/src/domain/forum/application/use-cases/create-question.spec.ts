import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  InMemoryQuestionAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsAttachmentsRepository:
InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorID: '1',
      title: 'Nova pergunta',
      content: 'Conteúdo da pergunta',
      attachmentsIDs: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
      .toHaveLength(2)
    expect(inMemoryQuestionsRepository.items[0].attachments.currentItems)
      .toEqual([
        expect.objectContaining({ attachmentID: new UniqueEntityID('1') }),
        expect.objectContaining({ attachmentID: new UniqueEntityID('2') }),
      ])
  })
})
