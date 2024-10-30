import { Body, ConflictException, Controller, Post } from '@nestjs/common'
import { hash } from 'bcrypt'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller('/accounts')
class CreateAccountController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(@Body() body: any) {
    const { email, name, password } = body

    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })
  }
}

export { CreateAccountController }
