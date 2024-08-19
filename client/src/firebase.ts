import { getFirestore } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export const firebaseConfig = {
  apiKey: 'AIzaSyDwvLB11oKMm2BJz2vd70MLWVio-0oL1Nk',
  authDomain: 'registegic-f7a97.firebaseapp.com',
  projectId: 'registegic-f7a97',
  storageBucket: 'registegic-f7a97.appspot.com',
  messagingSenderId: '1060865620337',
  appId: '1:1060865620337:web:45ed14b734206c05b79ed0',
  measurementId: 'G-LCBRSEKQX1',
}

const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)
export const firebaseStore = getFirestore(app)
