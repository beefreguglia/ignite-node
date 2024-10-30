import { Injectable } from '@nestjs/common'

import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { PrismaService } from '../prisma.service'

@Injectable()
class PrismaQuestionRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findByID(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    return { question }
  }

  findBySlug(slug: string): Promise<Question | null> {
    throw new Error('Method not implemented.')
  }

  findManyRecent(params: PaginationParams): Promise<Question[]> {
    throw new Error('Method not implemented.')
  }

  create(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(question: Question): Promise<Question> {
    throw new Error('Method not implemented.')
  }

  delete(question: Question): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
