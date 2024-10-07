export class UserAlreadyExistsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
