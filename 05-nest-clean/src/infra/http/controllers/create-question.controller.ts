import {
  Body,
  ConflictException,
  Controller,
  Post,
  UseGuards,
} from '@nestjs/common'
import { z } from 'zod'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const createQuestionBodySchema = z.object({
  title: z.string(),
  content: z.string(),
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const { sub: userId } = user

    const slug = this.convertToSlug(title)

    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (question) {
      throw new ConflictException('Question with this slug already exists.')
    }

    await this.prisma.question.create({
      data: {
        title,
        content,
        slug,
        authorId: userId,
      },
    })
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }
}
