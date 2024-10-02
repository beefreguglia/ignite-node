import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from '../src/app'

describe('Meals routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  it('should be able to create a new meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })
  })

  it('should be able to list all meals', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    expect(listMealsResponse.body).toEqual({
      meals: [
        expect.objectContaining({
          name: 'Arroz com ovo',
          description: 'Arroz com ovo, 250g',
          fits_diet: 1,
        }),
      ],
    })
  })

  it('should be able to get a specific meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })

    const listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    const mealId = listMealsResponse.body.meals[0].id

    const getMealsResponse = await request(app.server)
      .get(`/meals/${mealId}`)
      .set('Cookie', cookies!)
      .expect(200)

    expect(getMealsResponse.body).toEqual({
      meal: expect.objectContaining({
        name: 'Arroz com ovo',
        description: 'Arroz com ovo, 250g',
        fits_diet: 1,
      }),
    })
  })

  it('should be able to update a specific meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })

    let listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    const mealId = listMealsResponse.body.meals[0].id

    await request(app.server)
      .put(`/meals/${mealId}`)
      .set('Cookie', cookies!)
      .send({
        name: 'Arroz feijão e bife',
        description:
          'Arroz integral, feijão vermelho e bife de boi. 550 gramas',
        fits_diet: true,
      })
      .expect(204)

    listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    expect(listMealsResponse.body).toEqual({
      meals: [
        expect.objectContaining({
          name: 'Arroz feijão e bife',
          description:
            'Arroz integral, feijão vermelho e bife de boi. 550 gramas',
          fits_diet: 1,
        }),
      ],
    })
  })

  it('should be able to delete a specific meal', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })

    let listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    const mealId = listMealsResponse.body.meals[0].id

    await request(app.server)
      .delete(`/meals/${mealId}`)
      .set('Cookie', cookies!)
      .expect(204)

    listMealsResponse = await request(app.server)
      .get('/meals')
      .set('Cookie', cookies!)
      .expect(200)

    expect(listMealsResponse.body).toEqual({
      meals: [],
    })
  })

  it('should be able to get metrics of meals', async () => {
    const createUserResponse = await request(app.server).post('/users').send({
      name: 'Test name',
      email: 'test@test.com',
    })

    const cookies = createUserResponse.get('Set-Cookie')

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz com ovo',
      description: 'Arroz com ovo, 250g',
      fits_diet: true,
    })

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Lasanha',
      description: 'Lasanha a bolonhesa, 600g',
      fits_diet: false,
    })

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Arroz e bife de frango',
      description: 'Arroz integra e frango, 550g',
      fits_diet: true,
    })

    await request(app.server).post('/meals').set('Cookie', cookies!).send({
      name: 'Sushi',
      description: 'Temaki de salmão, 350g',
      fits_diet: true,
    })

    const getMealsMetricsResponse = await request(app.server)
      .get('/meals/metrics')
      .set('Cookie', cookies!)
      .expect(200)

    expect(getMealsMetricsResponse.body).toEqual({
      totalMeals: 4,
      totalMealsInsideDiet: 3,
      totalMealsOutsideDiet: 1,
      bestInsideDietSequence: 2,
    })
  })
})
