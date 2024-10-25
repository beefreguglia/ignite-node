import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { makeOrganization } from 'tests/factory/make-org'
import { makePet } from 'tests/factory/make-pet'

describe('Create Pet (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new pet', async () => {
    const organization = makeOrganization()

    await request(app.server).post('/organizations').send(organization)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: organization.email, password: organization.password })

    const response = await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    expect(response.status).toBe(201)
  })
})
