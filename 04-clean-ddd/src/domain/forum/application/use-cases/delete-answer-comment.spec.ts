import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryAnswerCommentsRepository,
} from '../../../../../test/repositories/in-memory-answer-comments-repository'
import { DeleteAnswerCommentUseCase } from './delete-answer-comment'
import {
  makeAnswerComment,
} from '../../../../../test/factories/make-answer-comment'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'

let inMemoryAnswerCommentsRepository: InMemoryAnswerCommentsRepository
let sut: DeleteAnswerCommentUseCase

describe('Delete a answer comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentsRepository =
      new InMemoryAnswerCommentsRepository()

    sut = new DeleteAnswerCommentUseCase(inMemoryAnswerCommentsRepository)
  })

  it('should be able to delete a answer comment',
    async () => {
      const answerComment = makeAnswerComment()

      await inMemoryAnswerCommentsRepository.create(answerComment)

      const result = await sut.execute({
        answerCommentID: answerComment.id.toString(),
        authorID: answerComment.authorID.toString(),
      })

      expect(result.isRight()).toBe(true)
      expect(inMemoryAnswerCommentsRepository.items)
        .toHaveLength(0)
    },
  )

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment(
      { authorID: new UniqueEntityID('author-1') },
    )

    await inMemoryAnswerCommentsRepository.create(answerComment)
    const result = await sut.execute({
      answerCommentID: answerComment.id.toString(),
      authorID: 'author-2',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
