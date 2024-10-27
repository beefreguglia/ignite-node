import { Question } from '../../enterprise/entities/question'
import { QuestionsRepository } from '../repositories/questions-repository'

interface EditQuestionUseCaseRequest {
  authorID: string
  questionID: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

export class EditQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorID,
    questionID,
    content,
    title,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findByID(questionID)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorID !== question.authorID.toString()) {
      throw new Error('Not allowed.')
    }

    question.title = title
    question.content = content

    const editedQuestion = await this.questionsRepository.save(question)

    return { question: editedQuestion }
  }
}
