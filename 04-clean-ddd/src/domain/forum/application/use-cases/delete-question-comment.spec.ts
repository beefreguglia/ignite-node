import { describe, expect, it, beforeEach } from 'vitest'
import {
  InMemoryQuestionCommentsRepository,
} from '../../../../../test/repositories/in-memory-question-comments-repository'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import {
  makeQuestionComment,
} from '../../../../../test/factories/make-question-comment'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete a question comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()

    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionCommentsRepository)
  })

  it('should be able to delete a question comment',
    async () => {
      const questionComment = makeQuestionComment()

      await inMemoryQuestionCommentsRepository.create(questionComment)

      await sut.execute({
        questionCommentID: questionComment.id.toString(),
        authorID: questionComment.authorID.toString(),
      })

      expect(inMemoryQuestionCommentsRepository.items)
        .toHaveLength(0)
    },
  )

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment(
      { authorID: new UniqueEntityID('author-1') },
    )

    await inMemoryQuestionCommentsRepository.create(questionComment)

    await expect(() => sut.execute({
      questionCommentID: questionComment.id.toString(),
      authorID: 'author-2',
    })).rejects.toBeInstanceOf(Error)
  })
})
