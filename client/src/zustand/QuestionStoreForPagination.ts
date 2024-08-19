import { create } from 'zustand'
import type { IQuestion } from '../interfaces'

interface IQuestionState {
  QuestionsP: Array<IQuestion>
  setQuestionsP: (questions: Array<IQuestion>) => void
  addQuestionP: (question: IQuestion) => void
  updateQuestionP: (question: IQuestion) => void
  deleteQuestionP: (question: IQuestion) => void
}

export const QuestionStoreForPagination = create<IQuestionState>(
  set => ({
    QuestionsP: [],
    setQuestionsP: question => set({ QuestionsP: question }),
    addQuestionP: (question: IQuestion) => {
      set(state => ({ QuestionsP: [...state.QuestionsP, question] }))
    },
    updateQuestionP: (updatedQuestion: IQuestion) => {
      set(state => ({
        QuestionsP: state.QuestionsP.map(question =>
          question.id === updatedQuestion.id ? updatedQuestion : question,
        ),
      }))
    },
    deleteQuestionP: (deletedQuestion: IQuestion) => {
      set(state => ({
        QuestionsP: state.QuestionsP.filter(question =>
          question.id !== deletedQuestion.id),
      }))
    },
  }),
)
