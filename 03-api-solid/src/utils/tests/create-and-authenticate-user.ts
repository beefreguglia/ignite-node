import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

interface User {
  name: string
  email: string
  password: string
}

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  user: User,
  isAdmin = false,
): Promise<{ accessToken: string }> {
  const { email, name, password } = user

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash: await hash(password, 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password })

  const { accessToken } = authResponse.body

  return { accessToken }
}
