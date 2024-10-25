import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from 'tests/factory/make-org'

describe('Authenticate Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should authenticate an org', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const response = await request(app.server)
      .post('/organizations/sessions')
      .send({
        email: org.email,
        password: org.password,
      })

    expect(response.status).toBe(200)
    expect(response.body.token).toEqual(expect.any(String))
  })
})
