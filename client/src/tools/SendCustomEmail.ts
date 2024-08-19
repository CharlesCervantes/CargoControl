import { addDoc, collection } from 'firebase/firestore'
import { firebaseStore } from '../firebase'

export default async function sendCustomEmail(to: any, subject: any, html: any) {
  const collectionRef = collection(firebaseStore, 'mail')
  const emailContent = {
    to,
    message: {
      subject,
      html,
    },
  }
  return addDoc(collectionRef, emailContent)
}
