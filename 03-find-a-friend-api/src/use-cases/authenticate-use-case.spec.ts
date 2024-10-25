import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { AuthenticateUseCase } from './authenticate-use-case'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { makeOrganization } from 'tests/factory/make-org'
import { hash } from 'bcryptjs'

let organizationRepository: InMemoryOrganizationsRepository
let sut: AuthenticateUseCase

describe('Authenticate use case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new AuthenticateUseCase(organizationRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'test@example.com'
    const password = '123456'

    const org = await organizationRepository.create(
      makeOrganization({ email, password: await hash(password, 6) }),
    )

    const { organization: authenticatedOrg } = await sut.execute({
      email,
      password,
    })

    expect(authenticatedOrg).toEqual(org)
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'org@example.com'
    const password = '123456'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'test@example.com'
    const password = '123456'
    const wrongPassword = 'wrong'

    await organizationRepository.create(makeOrganization({ email, password }))

    await expect(() =>
      sut.execute({
        email,
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
