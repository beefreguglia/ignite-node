import { describe, expect, it, beforeEach } from 'vitest'

import {
  InMemoryNotificationsRepository,
} from '../../../../../test/repositories/in-memory-notifications-repository'
import { ReadNotificationUseCase } from './read-notification'
import {
  makeNotification,
} from '../../../../../test/factories/make-notification'
import { UniqueEntityID } from '../../../../core/entities/unique-entity-id'
import {
  NotAllowedError,
} from '../../../../core/errors/errors/not-allowed-error'

let inMemoryNotificationsRepository: InMemoryNotificationsRepository
let sut: ReadNotificationUseCase

describe('Read notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationsRepository()
    sut = new ReadNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('should be able to create a notification', async () => {
    const notification = makeNotification()

    await inMemoryNotificationsRepository.create(notification)

    const result = await sut.execute({
      recipientID: notification.recipientID.toString(),
      notificationID: notification.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0].readAt)
      .toEqual(expect.any(Date))
  })

  it('should not be able to read a notification from another user',
    async () => {
      const notification = makeNotification({
        recipientID: new UniqueEntityID('recipient-1'),
      })

      await inMemoryNotificationsRepository.create(notification)

      const result = await sut.execute({
        notificationID: notification.id.toString(),
        recipientID: 'recipient-2',
      })

      expect(result.isLeft()).toBe(true)
      expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
