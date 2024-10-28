import { describe, expect, it } from 'vitest'
import { Either, left, right } from './either'

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(10)
  } else {
    return left('error')
  }
}

describe('Either', () => {
  it('should be able to return success result', () => {
    const result = doSomething(true)

    expect(result.isRight()).toBe(true)
    expect(result.isLeft()).toBe(false)
  })

  it('should be able to return error result', () => {
    const result = doSomething(false)

    expect(result.isRight()).toEqual(false)
    expect(result.isLeft()).toEqual(true)
  })
})
