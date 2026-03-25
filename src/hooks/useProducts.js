import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDb } from '../firebase'

const toProductShape = (item, fallbackId) => {
  if (!item || typeof item !== 'object') return null
  const categoryRaw = item.category
  const category = Array.isArray(categoryRaw)
    ? categoryRaw
        .map((value) => String(value ?? '').trim().toLowerCase())
        .filter(Boolean)
    : [String(categoryRaw ?? '').trim().toLowerCase()].filter(Boolean)

  return {
    id: item.id ?? fallbackId,
    name: String(item.name ?? '').trim(),
    price: Number(item.price ?? 0),
    category,
    images: Array.isArray(item.images) ? item.images.filter(Boolean).slice(0, 3) : (item.image ? [item.image] : []),
    shortDescription: String(item['short description'] ?? item.shortDescription ?? item.short_description ?? item.description ?? '').trim(),
  }
}

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const productsCollectionRef = collection(firestoreDb, 'products')
    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (snapshot) => {
        const loadedProducts = snapshot.docs
          .map((doc) => toProductShape(doc.data(), doc.id))
          .filter((item) => item && item.name)
        setProducts(loadedProducts)
        setError('')
        setLoading(false)
      },
      (dbError) => {
        setProducts([])
        setError(
          dbError?.message ||
            'Failed to load products from Firestore collection "products".',
        )
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [])

  return { products, loading, error }
}
