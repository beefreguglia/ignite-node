import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { makeCreateOrganizationUseCase } from '@/use-cases/factories/make-create-organization-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createBodySchema = z.object({
  email: z.string(),
  password: z.string(),

  name: z.string(),
  phone: z.string(),
  owner_name: z.string(),

  cep: z.string(),
  city: z.string(),
  complement: z.string().optional(),
  neighborhood: z.string(),
  number: z.number().optional(),
  state: z.string(),
  street: z.string(),
})

const authenticateBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export class OrganizationController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const {
      cep,
      city,
      complement,
      email,
      name,
      neighborhood,
      number,
      owner_name,
      password,
      phone,
      state,
      street,
    } = createBodySchema.parse(request.body)

    const createOrganizationUseCase = makeCreateOrganizationUseCase()

    try {
      const { organization } = await createOrganizationUseCase.execute({
        cep,
        city,
        email,
        name,
        neighborhood,
        owner_name,
        password,
        state,
        street,
        complement,
        number,
        phone,
      })

      return reply.status(201).send(organization)
    } catch (error) {
      if (error instanceof OrganizationAlreadyExistsError) {
        return reply.status(400).send({ message: error.message })
      }
    }
  }

  async authenticate(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = authenticateBodySchema.parse(request.body)

    const authenticateUseCase = makeAuthenticateUseCase()

    try {
      const { organization } = await authenticateUseCase.execute({
        email,
        password,
      })

      const token = await reply.jwtSign(
        {},
        {
          sign: {
            sub: organization.id,
          },
        },
      )

      return reply.status(200).send({ token })
    } catch (error) {
      if (error instanceof OrganizationAlreadyExistsError) {
        return reply.status(400).send({ message: error.message })
      }
    }
  }
}
