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

describe('Create question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionsRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should not be able to choose another user question best answer',
    async () => {
      const question = makeQuestion()

      await inMemoryQuestionsRepository.create(question)

      const { questionComment } = await sut.execute({
        questionID: question.id.toString(),
        authorID: question.authorID.toString(),
        content: 'Comentário teste',
      })

      expect(inMemoryQuestionCommentsRepository.items[0].content)
        .toEqual(questionComment.content)
    })
})
