import { Question } from '@/domain/forum/enterprise/entities/question'
import { Question as PrismaQuestion } from '@prisma/client'

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create({
      authorId: raw.authorId,
    })
  }
}
