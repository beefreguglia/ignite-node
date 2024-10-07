import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate user case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'
    const name = 'John Doe'

    await usersRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await expect(() =>
      sut.execute({
        email,
        password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'
    const name = 'John Doe'
    const wrongPassword = 'wrongpassword'

    await usersRepository.create({
      email,
      name,
      password_hash: await hash(password, 6),
    })

    await expect(() =>
      sut.execute({
        email,
        password: wrongPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
