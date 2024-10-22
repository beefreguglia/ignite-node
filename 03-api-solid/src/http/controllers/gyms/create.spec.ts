import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Create gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const name = 'John Doe'
    const email = 'johndoe@example.com'
    const password = '123456'

    const { accessToken } = await createAndAuthenticateUser(app, {
      email,
      name,
      password,
    })

    const title = 'Javascript Gym'
    const description = 'Some description'
    const phone = '11999999999'
    const latitude = -20.3992387
    const longitude = -43.5105982

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title,
        description,
        phone,
        latitude,
        longitude,
      })

    expect(response.statusCode).toEqual(201)
  })
})
