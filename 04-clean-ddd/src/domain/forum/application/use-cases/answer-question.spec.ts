import { describe, expect, it, beforeEach } from 'vitest'

import { AnswerQuestionUseCase } from './answer-question'
import {
  InMemoryAnswersRepository,
} from 'test/repositories/in-memory-answers-repository'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase // System under test

describe('Create question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const { answer } = await sut.execute({
      instructorID: '1',
      questionID: '1',
      content: 'Nova resposta',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
