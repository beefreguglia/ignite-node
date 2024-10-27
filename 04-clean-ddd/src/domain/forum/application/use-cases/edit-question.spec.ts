import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { EditQuestionUseCase } from './edit-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      questionID: newQuestion.id.toValue(),
      authorID: 'author-1',
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Pergunta teste',
      content: 'Conteúdo teste',
    })
  })

  it('should not be able to edit a question from another user', async () => {
    const newQuestion = makeQuestion(
      {
        authorID: new UniqueEntityID('author-1'),
      },
      new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        questionID: newQuestion.id.toValue(),
        authorID: 'author-2',
        title: 'Pergunta teste',
        content: 'Conteúdo teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
