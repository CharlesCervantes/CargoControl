import { create } from 'zustand'
import type { IQuestion } from '../interfaces'

interface IQuestionState {
  Questions: Array<IQuestion>
  setQuestions: (questions: Array<IQuestion>) => void
  addQuestion: (question: IQuestion) => void
  updateQuestion: (question: IQuestion) => void
  deleteQuestion: (question: IQuestion) => void
}

export const QuestionStore = create<IQuestionState>(
  set => ({
    Questions: [],
    setQuestions: question => set({ Questions: question }),
    addQuestion: (question: IQuestion) => {
      set(state => ({ Questions: [...state.Questions, question] }))
    },
    updateQuestion: (updatedQuestion: IQuestion) => {
      set(state => ({
        Questions: state.Questions.map(question =>
          question.id === updatedQuestion.id ? updatedQuestion : question,
        ),
      }))
    },
    deleteQuestion: (deletedQuestion: IQuestion) => {
      set(state => ({
        Questions: state.Questions.filter(question =>
          question.id !== deletedQuestion.id),
      }))
    },
  }),
)
