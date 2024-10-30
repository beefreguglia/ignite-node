import { beforeEach, describe, expect, it } from 'vitest'

import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from '@/../test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '@/../test/factories/make-answer-comment'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to fetch answer comments by answer ID', async () => {
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )
    await inMemoryAnswerCommentsRepository.create(
      makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
    )

    const result = await sut.execute({ answerID: 'answer-1', page: 1 })

    expect(result.isRight()).toBe(true)

    expect(result.value?.answerComments).toHaveLength(3)
  })

  it('should be able to fetch paginated answers comments', async () => {
    for (let i = 0; i <= 22; i++) {
      await inMemoryAnswerCommentsRepository.create(
        makeAnswerComment({ answerID: new UniqueEntityID('answer-1') }),
      )
    }

    const result = await sut.execute({ answerID: 'answer-1', page: 2 })

    expect(result.isRight()).toBe(true)
    expect(result.value?.answerComments).toHaveLength(3)
  })
})
