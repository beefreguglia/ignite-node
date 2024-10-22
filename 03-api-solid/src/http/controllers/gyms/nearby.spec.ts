import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/tests/create-and-authenticate-user'

describe('Search nearby gyms (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list nearby gyms', async () => {
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

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title,
        description,
        phone,
        latitude: -20.3992387,
        longitude: -43.5105982,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        title: 'Typescript Gym',
        description,
        phone,
        latitude: -20.397591,
        longitude: -42.9508829,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -20.3992387,
        longitude: -43.5105982,
      })
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'Javascript Gym' }),
    ])
  })
})
