import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest'
import { OnAnswerCreated } from './on-answer-created'
import { makeAnswer } from '@/../test/factories/make-answer'
import { InMemoryAnswersRepository } from '@/../test/repositories/in-memory-answers-repository'
import { InMemoryAnswerAttachmentsRepository } from '@/../test/repositories/in-memory-answer-attachments-repository'
import { InMemoryQuestionsRepository } from '@/../test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from '@/../test/repositories/in-memory-question-attachments-repository'
import { SendNotificationUseCase } from '../use-cases/send-notification'
import { InMemoryNotificationsRepository } from '@/../test/repositories/in-memory-notifications-repository'
import { makeQuestion } from '@/../test/factories/make-question'
import { waitFor } from '@/../test/utils/wait-for'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy: MockInstance<
  typeof sendNotificationUseCase.execute
>

describe('On question best answer', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()

    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )

    inMemoryAnswerAttachmentsRepository =
      new InMemoryAnswerAttachmentsRepository()

    inMemoryAnswersRepository = new InMemoryAnswersRepository(
      inMemoryAnswerAttachmentsRepository,
    )

    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()

    sendNotificationUseCase = new SendNotificationUseCase(
      inMemoryNotificationsRepository,
    )

    sendNotificationExecuteSpy = vi.spyOn(sendNotificationUseCase, 'execute')

    // eslint-disable-next-line no-new
    new OnAnswerCreated(inMemoryQuestionsRepository, sendNotificationUseCase)
  })

  it('should send a notification when a question has new best answer chosen', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionId: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    question.bestAnswerId = answer.id

    inMemoryQuestionsRepository.save(question)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
