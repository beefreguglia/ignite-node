import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import {
  InMemoryQuestionCommentsRepository,
} from '../../../../../test/repositories/in-memory-question-comments-repository'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { makeQuestion } from '../../../../../test/factories/make-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question',
    async () => {
      const question = makeQuestion()

      await inMemoryQuestionsRepository.create(question)

      const result = await sut.execute({
        questionID: question.id.toString(),
        authorID: question.authorID.toString(),
        content: 'Comentário teste',
      })

      expect(result.isRight()).toBe(true)
      expect(inMemoryQuestionCommentsRepository.items[0])
        .toEqual(result.value.questionComment)
    })
})
