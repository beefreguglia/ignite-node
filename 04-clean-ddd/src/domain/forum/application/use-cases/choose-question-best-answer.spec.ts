import { beforeEach, describe, expect, it } from 'vitest'

import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose best answer question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository,
    )
  })

  it('should be able to edit a question', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({
      questionID: question.id,
    })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await sut.execute({
      answerID: answer.id.toString(),
      authorID: question.authorID.toString(),
    })

    expect(inMemoryQuestionsRepository.items[0].bestAnswerID).toEqual(answer.id)
  })

  it('should not be able to choose another user question best answer',
    async () => {
      const question = makeQuestion()
      const answer = makeAnswer({
        questionID: question.id,
      })

      await inMemoryQuestionsRepository.create(question)
      await inMemoryAnswersRepository.create(answer)

      await expect(() => sut.execute({
        answerID: answer.id.toString(),
        authorID: 'author-2',
      })).rejects.toBeInstanceOf(Error)
    },
  )
})
