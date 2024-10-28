import { describe, expect, it, beforeEach } from 'vitest'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '../../../../../test/factories/make-question'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import {
  InMemoryQuestionAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsAttachmentsRepository
: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsAttachmentsRepository =
    new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionsAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    inMemoryQuestionsRepository.create(newQuestion)
    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  })
})
