import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { makeOrganization } from 'tests/factory/make-org'
import { makePet } from 'tests/factory/make-pet'

describe('Get Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should get a pet', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    const response = await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const getPetResponse = await request(app.server)
      .get(`/organizations/pets/${response.body.id}`)
      .set('Authorization', `Bearer ${authResponse.body.token}`)

    expect(getPetResponse.status).toBe(200)
  })
})
