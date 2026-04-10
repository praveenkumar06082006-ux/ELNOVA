import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBYiHjMULtPBRQaPF2-nRIrKHz-KxSksDo',
  authDomain: 'elnova-store.firebaseapp.com',
  projectId: 'elnova-store',
  storageBucket: 'elnova-store.firebasestorage.app',
  messagingSenderId: '792050743168',
  appId: '1:792050743168:web:509f20055ee98f87bab365',
  measurementId: 'G-J5B5XTV6Y1',
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const storage = getStorage(app)
