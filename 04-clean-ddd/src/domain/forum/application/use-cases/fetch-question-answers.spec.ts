import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  InMemoryAnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-answer-attachments-repository'

let inMemoryAnswersAttachmentsRepository:
InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryAnswersAttachmentsRepository =
    new InMemoryAnswerAttachmentsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswersAttachmentsRepository,
    )
    sut = new FetchQuestionAnswersUseCase(inMemoryAnswersRepository)
  })

  it('should be able to fetch question answers', async () => {
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionID: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionID: new UniqueEntityID('question-1') }),
    )
    await inMemoryAnswersRepository.create(
      makeAnswer({ questionID: new UniqueEntityID('question-1') }),
    )

    const result = await sut.execute({ questionID: 'question-1', page: 1 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(3)
  })

  it('should be able to fetch paginated question answers', async () => {
    for (let i = 0; i <= 21; i++) {
      await inMemoryAnswersRepository
        .create(makeAnswer({ questionID: new UniqueEntityID('question-1') }))
    }

    const result = await sut.execute({ questionID: 'question-1', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answers).toHaveLength(2)
  })
})
