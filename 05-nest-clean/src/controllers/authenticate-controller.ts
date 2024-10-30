import { Controller, HttpCode, Post } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

// const createAccountBodySchema = z.object({
//   name: z.string(),
//   email: z.string().email(),
//   password: z.string(),
// })

// type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/sessions')
class AuthenticateController {
  constructor(private jwt: JwtService) {}

  @Post()
  @HttpCode(201)
  async handle() {
    const token = this.jwt.sign({ sub: 'user-id' })
    return token
  }
}

export { AuthenticateController }
