import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Create check-in (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to make a check-in', async () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'
    const password = '123456'

    const { token } = await createAndAuthenticateUser(app, {
      email,
      name,
      password,
    })

    const title = 'Javascript Gym'
    const description = 'Some description'
    const phone = '11999999999'
    const latitude = -20.3992387
    const longitude = -43.5105982

    const gym = await prisma.gym.create({
      data: {
        latitude,
        longitude,
        title,
        description,
        phone,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({ latitude, longitude })

    expect(response.statusCode).toEqual(201)
  })
})
