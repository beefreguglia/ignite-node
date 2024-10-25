import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from 'tests/factory/make-org'

describe('Create Org (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should create a new org', async () => {
    const response = await request(app.server)
      .post('/organizations')
      .send(makeOrganization())

    expect(response.status).toBe(201)
  })
})
