import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exitts-error'

describe('Register user case', () => {
  it('should to register', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'
    const password = '123456'
    const name = 'John Doe'

    const { user } = await registerUseCase.execute({
      email,
      name,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'
    const password = '123456'
    const name = 'John Doe'

    const { user } = await registerUseCase.execute({
      email,
      name,
      password,
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'
    const password = '123456'
    const name = 'John Doe'

    await registerUseCase.execute({
      email,
      name,
      password,
    })

    await expect(() =>
      registerUseCase.execute({
        email,
        name,
        password,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
