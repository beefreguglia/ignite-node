import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'

import { UserPayload } from '@/infra/auth/jwt.strategy'
import { CurrentUser } from '@/infra/auth/current-user.decorator'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/edit-answer'

const editAnswerBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
})

type EditAnswerBodySchema = z.infer<typeof editAnswerBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editAnswerBodySchema)

@Controller('/answers/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditAnswerBodySchema,
    @Param('id') id: string,
    @CurrentUser() user: UserPayload,
  ) {
    const { content, attachments } = body
    const { sub: userId } = user

    const result = await this.editAnswer.execute({
      content,
      authorId: userId,
      attachmentsIds: attachments,
      answerId: id,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
