import { Either, left, right } from '../../../../core/either'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'
import {
  ResourceNotFoundError,
} from '../../../../core/errors/errors/resource-not-found-error'
import { Notification } from '../../enterprise/entities/notification'
import {
  NotificationsRepository,
} from '../repositories/notifications-repository'

interface ReadNotificationUseCaseRequest {
  recipientID: string
  notificationID: string
}

type ReadNotificationUseCaseResponse = Either<
ResourceNotFoundError | NotAllowedError,
  {
    notification: Notification
  }
>

export class ReadNotificationUseCase {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({
    notificationID,
    recipientID,
  }: ReadNotificationUseCaseRequest): Promise<ReadNotificationUseCaseResponse> {
    const notification = await this.notificationsRepository
      .findById(notificationID)

    if (!notification) {
      return left(new ResourceNotFoundError())
    }

    if (recipientID !== notification.recipientID.toString()) {
      return left(new NotAllowedError())
    }

    notification.read()

    await this.notificationsRepository.save(notification)

    return right({ notification })
  }
}
