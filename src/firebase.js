import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBYiHjMULtPBRQaPF2-nRIrKHz-KxSksDo',
  authDomain: 'elnova-store.firebaseapp.com',
  databaseURL:
    'https://elnova-store-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'elnova-store',
  storageBucket: 'elnova-store.firebasestorage.app',
  messagingSenderId: '792050743168',
  appId: '1:792050743168:web:509f20055ee98f87bab365',
  measurementId: 'G-J5B5XTV6Y1',
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)
export const firestoreDb = getFirestore(app)
