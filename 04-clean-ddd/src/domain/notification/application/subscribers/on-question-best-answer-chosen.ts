import { DomainEvents } from '../../../../core/events/domain-events'
import { EventHandler } from '../../../../core/events/event-handler'
import {
  AnswersRepository,
} from '../../../forum/application/repositories/answers-repository'
import {
  QuestionBestAnswerChosenEvent,
} from '../../../forum/enterprise/events/question-best-answer-chosen-event'
import { SendNotificationUseCase } from '../use-cases/send-notification'

export class OnQuestionBestAnswerChosen implements EventHandler {
  constructor(
    private answersRepository: AnswersRepository,
    private sendNotificationUseCase: SendNotificationUseCase,
  ) {
    this.setupSubscriptions()
  }

  setupSubscriptions(): void {
    DomainEvents.register(
      this.sendQuestionBestAnswerNotification.bind(this),
      QuestionBestAnswerChosenEvent.name,
    )
  }

  private async sendQuestionBestAnswerNotification({
    question,
    bestAnswerId,
  }: QuestionBestAnswerChosenEvent) {
    const answer = await this.answersRepository
      .findByID(bestAnswerId.toString())

    if (answer) {
      await this.sendNotificationUseCase.execute({
        recipientID: question.authorID.toString(),
        title: 'Sua Resposta foi escolhida!',
        content:
        `A resposta que você enviou em "${question.title
          .substring(0, 20).concat('...')}" foi escolhida pelo autor!`,
      })
    }
  }
}
