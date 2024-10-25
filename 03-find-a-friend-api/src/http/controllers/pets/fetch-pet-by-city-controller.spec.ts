import request from 'supertest'

import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { makeOrganization } from 'tests/factory/make-org'
import { makePet } from 'tests/factory/make-pet'

describe('Fetch pets by city (E2E)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch pets by city', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/organizations/pets')
      .query({ city: org.city })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should not be able to search pets without city', async () => {
    const response = await request(app.server).get('/organizations/pets')

    expect(response.status).toBe(400)
  })

  it('should be able to search pets by city and age', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ age: 1 }))

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet())

    const response = await request(app.server)
      .get('/organizations/pets')
      .query({ city: org.city, age: 1 })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and size', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'SMALL' }))

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'MEDIUM' }))

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ size: 'LARGE' }))

    const response = await request(app.server)
      .get('/organizations/pets')
      .query({ city: org.city, size: 'SMALL' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and energy level', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy_level: 'LOW' }))

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ energy_level: 'MEDIUM' }))

    const response = await request(app.server)
      .get('/organizations/pets')
      .query({ city: org.city, energy_level: 'LOW' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and environment', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    await request(app.server)
      .post('/organizations/pets')
      .set('Authorization', `Bearer ${authResponse.body.token}`)
      .send(makePet({ environment: 'MEDIUM' }))

    const response = await request(app.server)
      .get('/organizations/pets')
      .query({ city: org.city, environment: 'MEDIUM' })

    expect(response.status).toBe(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to search pets by city and all filters', async () => {
    const org = makeOrganization()

    await request(app.server).post('/organizations').send(org)

    const authResponse = await request(app.server)
      .post('/organizations/sessions')
      .send({ email: org.email, password: org.password })

    const pets = [
      makePet({
        age: 1,
        size: 'SMALL',
        energy_level: 'LOW',
        environment: 'LARGE',
      }),
      makePet({
        age: 2,
        size: 'MEDIUM',
        energy_level: 'MEDIUM',
        environment: 'MEDIUM',
      }),
      makePet({
        age: 1,
        size: 'LARGE',
        energy_level: 'HIGH',
        environment: 'SMALL',
      }),
      makePet({
        age: 4,
        size: 'SMALL',
        energy_level: 'LOW',
        environment: 'SMALL',
      }),
      makePet({
        age: 5,
        size: 'MEDIUM',
        energy_level: 'MEDIUM',
        environment: 'MEDIUM',
      }),
    ]

    await Promise.all(
      pets.map((pet) =>
        request(app.server)
          .post('/organizations/pets')
          .set('Authorization', `Bearer ${authResponse.body.token}`)
          .send(pet),
      ),
    )

    let response = await request(app.server).get('/organizations/pets').query({
      city: org.city,
      age: 1,
      size: 'SMALL',
      energy_level: 'LOW',
      environment: 'LARGE',
    })

    expect(response.body.pets).toHaveLength(1)

    response = await request(app.server).get('/organizations/pets').query({
      city: org.city,
      size: 'MEDIUM',
    })

    expect(response.body.pets).toHaveLength(2)

    response = await request(app.server).get('/organizations/pets').query({
      city: org.city,
      energy_level: 'LOW',
    })

    expect(response.body.pets).toHaveLength(2)
  })
})
