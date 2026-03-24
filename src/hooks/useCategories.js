import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDb } from '../firebase'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Attempting to read from 'logo' collection as per user instruction
    const categoriesCollectionRef = collection(firestoreDb, 'logo')
    const unsubscribe = onSnapshot(
      categoriesCollectionRef,
      (snapshot) => {
        const loaded = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setCategories(loaded)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching categories from logo collection:', error)
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { categories, loading }
}
