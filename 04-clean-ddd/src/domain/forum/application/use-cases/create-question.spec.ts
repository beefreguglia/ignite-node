import { expect, test } from 'vitest'

import { QuestionsRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'
// import { Question } from '../entities/question'

const fakeQuestionsRepository: QuestionsRepository = {
  create: async () => {
  },
}

test('create a question', async () => {
  const createQuestionUseCase =
    new CreateQuestionUseCase(fakeQuestionsRepository)

  const { question } = await createQuestionUseCase.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteúdo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
