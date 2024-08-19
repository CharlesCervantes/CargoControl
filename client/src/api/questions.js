// client/src/api/questions.js
export const fetchQuestionsWithResponses = async() => {
  const response = await fetch('http://localhost:3000/api/questions')
  if (!response.ok)
    throw new Error('Error fetching questions with responses')

  return response.json()
}
