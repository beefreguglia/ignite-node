import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

@Injectable()
class PrismaAnswerRepository implements AnswersRepository {
  findByID(id: string): Promise<Answer | null> {
    throw new Error('Method not implemented.')
  }

  findManyByQuestionID(
    questionID: string,
    params: PaginationParams,
  ): Promise<Answer[]> {
    throw new Error('Method not implemented.')
  }

  create(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(answer: Answer): Promise<Answer> {
    throw new Error('Method not implemented.')
  }

  delete(answer: Answer): Promise<void> {
    throw new Error('Method not implemented.')
  }
}