import request from 'supertest'
import { FastifyInstance } from 'fastify'

interface User {
  name: string
  email: string
  password: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  user: User,
): Promise<{ accessToken: string }> {
  const { email, name, password } = user
  await request(app.server).post('/register').send({ name, email, password })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password })

  const { accessToken } = authResponse.body

  return { accessToken }
}
