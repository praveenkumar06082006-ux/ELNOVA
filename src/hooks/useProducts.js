import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { firestoreDb } from '../firebase'

const toProductShape = (item, fallbackId) => {
  if (!item || typeof item !== 'object') {
    console.warn('Invalid item data:', item, 'fallbackId:', fallbackId)
    return null
  }
  
  // Check for required fields
  if (!item.name || item.price === undefined || item.price === null) {
    console.warn('Missing required fields for item:', item, 'fallbackId:', fallbackId)
  }
  
  const categoryRaw = item.category
  const category = Array.isArray(categoryRaw)
    ? categoryRaw
        .map((value) => String(value ?? '').trim().toLowerCase())
        .filter(Boolean)
    : [String(categoryRaw ?? '').trim().toLowerCase()].filter(Boolean)

  // Handle images - check for both 'images' array and single 'image' field
  let productImages = []
  if (Array.isArray(item.images) && item.images.length > 0) {
    productImages = item.images.filter(img => img && typeof img === 'string').slice(0, 3)
  } else if (item.image && typeof item.image === 'string') {
    productImages = [item.image]
  } else {
    console.warn('No valid images found for item:', item.name, 'fallbackId:', fallbackId)
  }

  // Better price parsing
  let productPrice = 0
  if (typeof item.price === 'number') {
    productPrice = item.price
  } else if (typeof item.price === 'string') {
    const parsedPrice = parseFloat(item.price.replace(/[^\d.-]/g, ''))
    productPrice = isNaN(parsedPrice) ? 0 : parsedPrice
  } else {
    console.warn('Invalid price format for item:', item.name, 'price:', item.price, 'fallbackId:', fallbackId)
  }

  return {
    id: item.id ?? fallbackId,
    name: String(item.name ?? '').trim(),
    price: productPrice,
    category,
    images: productImages,
    shortDescription: String(item['short description'] ?? item.shortDescription ?? item.short_description ?? item.description ?? '').trim(),
    size: item.size, // Include size field from Firebase
  }
}

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    console.log('Connecting to Firestore collection: products')
    const productsCollectionRef = collection(firestoreDb, 'products')
    const unsubscribe = onSnapshot(
      productsCollectionRef,
      (snapshot) => {
        console.log('Firestore snapshot received, docs count:', snapshot.docs.length)
        console.log('Raw snapshot docs:', snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })))
        
        const loadedProducts = snapshot.docs
          .map((doc) => toProductShape(doc.data(), doc.id))
          .filter((item) => item && item.name)
        
        console.log('Processed products:', loadedProducts)
        setProducts(loadedProducts)
        setError('')
        setLoading(false)
      },
      (dbError) => {
        console.error('Firestore error:', dbError)
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
