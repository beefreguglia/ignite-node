import { FastifyReply, FastifyRequest } from 'fastify'
import { knex } from '../../database/knex'

export async function checkSessionIdExists(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { sessionId } = request.cookies

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unauthorized.',
    })
  }

  const user = await knex<UsersRepository>('users')
    .select()
    .where({
      session_id: sessionId,
    })
    .first()

  request.user = user
}
