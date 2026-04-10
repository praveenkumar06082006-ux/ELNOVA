import { useState, useEffect } from 'react'
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy, onSnapshot } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const REVIEWS_COLLECTION = 'reviews'

export const useFirebaseReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load reviews from Firebase on mount
  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true)
        
        // Get reviews from Firestore
        const reviewsQuery = query(
          collection(window.db, REVIEWS_COLLECTION),
          orderBy('date', 'desc')
        )
        
        const querySnapshot = await getDocs(reviewsQuery)
        const reviewsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        
        setReviews(reviewsData)
        setError('')
      } catch (err) {
        setError('Failed to load reviews from Firebase')
        console.error('Error loading reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()

    // Set up real-time listener for updates
    const unsubscribe = onSnapshot(
      query(collection(window.db, REVIEWS_COLLECTION), orderBy('date', 'desc')),
      (snapshot) => {
        const reviewsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
        setReviews(reviewsData)
      }
    )

    return () => unsubscribe()
  }, [])

  // Upload photo to Firebase Storage
  const uploadPhoto = async (file) => {
    if (!file) return null
    
    try {
      const storage = getStorage()
      const storageRef = ref(storage, `reviews/${Date.now()}_${file.name}`)
      
      await uploadBytes(storageRef, file)
      const downloadURL = await getDownloadURL(storageRef)
      
      return downloadURL
    } catch (err) {
      console.error('Error uploading photo:', err)
      throw new Error('Failed to upload photo')
    }
  }

  // Add a new review to Firebase
  const addReview = async (reviewData) => {
    try {
      // Validate required fields
      if (!reviewData.userName?.trim()) {
        throw new Error('Name is required')
      }
      if (!reviewData.comment?.trim()) {
        throw new Error('Review comment is required')
      }
      if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
        throw new Error('Valid rating is required')
      }

      let photoURL = null
      if (reviewData.photoFile) {
        photoURL = await uploadPhoto(reviewData.photoFile)
      }

      const newReview = {
        userName: reviewData.userName.trim(),
        rating: reviewData.rating,
        comment: reviewData.comment.trim(),
        date: new Date().toISOString(),
        productId: reviewData.productId || 'general',
        helpful: 0,
        photo: photoURL
      }

      // Add to Firestore
      const docRef = await addDoc(collection(window.db, REVIEWS_COLLECTION), newReview)
      
      return {
        id: docRef.id,
        ...newReview
      }
    } catch (err) {
      console.error('Error adding review:', err)
      throw err
    }
  }

  // Delete a review from Firebase
  const deleteReview = async (reviewId) => {
    try {
      await deleteDoc(doc(window.db, REVIEWS_COLLECTION, reviewId))
    } catch (err) {
      console.error('Error deleting review:', err)
      throw err
    }
  }

  // Get reviews for a specific product
  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === productId)
  }

  // Calculate average rating
  const getAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  // Get rating distribution
  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating]++
    })
    return distribution
  }

  return {
    reviews,
    loading,
    error,
    addReview,
    deleteReview,
    getProductReviews,
    getAverageRating,
    getRatingDistribution
  }
}
