import { beforeEach, describe, expect, it, vi, MockInstance } from 'vitest'
import { OnAnswerCreated } from './on-answer-created'
import { makeAnswer } from '../../../../../test/factories/make-answer'
import {
  InMemoryAnswersRepository,
} from '../../../../../test/repositories/in-memory-answers-repository'
import {
  InMemoryAnswerAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-answer-attachments-repository'
import {
  InMemoryQuestionsRepository,
} from '../../../../../test/repositories/in-memory-questions-repository'
import {
  InMemoryQuestionAttachmentsRepository,
// eslint-disable-next-line @stylistic/max-len
} from '../../../../../test/repositories/in-memory-question-attachments-repository'
import {
  SendNotificationUseCase,
} from '../use-cases/send-notification'
import {
  InMemoryNotificationsRepository,
} from '../../../../../test/repositories/in-memory-notifications-repository'
import { makeQuestion } from '../../../../../test/factories/make-question'
import { waitFor } from '../../../../../test/utils/wait-for'

let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryAnswerAttachmentsRepository: InMemoryAnswerAttachmentsRepository
let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sendNotificationUseCase: SendNotificationUseCase

let sendNotificationExecuteSpy
: MockInstance<typeof sendNotificationUseCase.execute>

describe('On answer created', () => {
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

  it('should send a notification when an answer is created', async () => {
    const question = makeQuestion()
    const answer = makeAnswer({ questionID: question.id })

    await inMemoryQuestionsRepository.create(question)
    await inMemoryAnswersRepository.create(answer)

    await waitFor(() => {
      expect(sendNotificationExecuteSpy).toHaveBeenCalled()
    })
  })
})
