import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrganizationUseCase } from './create-organization-use-case'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/organizations-in-memory-repository'
import { makeOrganization } from 'tests/factory/make-org'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationRepository: InMemoryOrganizationsRepository
let sut: CreateOrganizationUseCase

describe('Create organization use case', () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationsRepository()
    sut = new CreateOrganizationUseCase(organizationRepository)
  })

  it('should be able to create a new organization', async () => {
    const { organization } = await sut.execute(makeOrganization())

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should be able to create a new organization with only required fields', async () => {
    const { organization } = await sut.execute(makeOrganization())

    expect(organization.id).toEqual(expect.any(String))
  })

  it('should not be able to create a new organization with same email twice', async () => {
    await organizationRepository.create(
      makeOrganization({ email: 'example@example.com' }),
    )

    await expect(() =>
      sut.execute(makeOrganization({ email: 'example@example.com' })),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
})
