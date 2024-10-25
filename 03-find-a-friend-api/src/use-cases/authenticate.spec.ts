import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

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
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'

    await organizationRepository.create({
      address_id: 'addressId',
      email,
      name,
      owner_name,
      password: await hash(password, 6),
      phone,
    })

    const { organization } = await sut.execute({
      email,
      password,
    })

    expect(organization.id).toEqual(expect.any(String))
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
    const name = 'test'
    const owner_name = 'test name'
    const phone = '99 9 9999 9999'
    const wrongPassword = 'wrong'

    await organizationRepository.create({
      address_id: 'id',
      email,
      name,
      owner_name,
      phone,
      password: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
