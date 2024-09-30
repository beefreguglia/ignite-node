import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { mealsRoute } from './routes/meals'
import { usersRoute } from './routes/users'

export const app = fastify()

app.register(cookie)

app.register(usersRoute, {
  prefix: 'users',
})

app.register(mealsRoute, {
  prefix: 'meals',
})
