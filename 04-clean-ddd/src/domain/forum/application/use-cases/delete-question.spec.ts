import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { DeleteQuestionUseCase } from './delete-question'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by id', async () => {
    const question = makeQuestion({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await sut.execute({
      questionID: 'question-1',
      authorID: 'author-1',
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const question = makeQuestion({
      authorID: new UniqueEntityID('author-1'),
    },
    new UniqueEntityID('question-1'),
    )

    await inMemoryQuestionsRepository.create(question)

    await expect(sut.execute({
      questionID: 'question-1',
      authorID: 'author-2',
    })).rejects.toBeInstanceOf(Error)
  })
})
