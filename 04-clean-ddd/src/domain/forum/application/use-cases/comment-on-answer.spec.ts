import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import {
  InMemoryAnswerCommentsRepository,
} from '../../../../../test/repositories/in-memory-answer-comments-repository'
import { CommentOnAnswerUseCase } from './comment-on-answer'
import { makeAnswer } from '../../../../../test/factories/make-answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: CommentOnAnswerUseCase

describe('Create a comment answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    inMemoryAnswerCommentsRepository =
      new InMemoryAnswerCommentsRepository()

    sut = new CommentOnAnswerUseCase(
      inMemoryAnswersRepository,
      inMemoryAnswerCommentsRepository,
    )
  })

  it('should be able to comment on answer',
    async () => {
      const answer = makeAnswer()

      await inMemoryAnswersRepository.create(answer)

      const result = await sut.execute({
        answerID: answer.id.toString(),
        authorID: answer.authorID.toString(),
        content: 'Comentário teste',
      })

      expect(result.isRight()).toBe(true)
      expect(inMemoryAnswerCommentsRepository.items[0])
        .toEqual(result.value?.answerComment)
    })
})