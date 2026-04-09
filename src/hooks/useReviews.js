import { useState, useEffect } from 'react'

// Mock reviews data - in production, this would come from Firebase/API
const mockReviews = [
  {
    id: '1',
    productId: 'product1',
    userName: 'Rahul Kumar',
    rating: 5,
    comment: 'Excellent quality jersey! The material is very comfortable and the printing is perfect. Fits exactly as expected. Will definitely order again!',
    date: '2024-03-15T10:30:00Z',
    helpful: 12
  },
  {
    id: '2',
    productId: 'product1',
    userName: 'Priya Sharma',
    rating: 4,
    comment: 'Great product overall. The design is amazing and the fabric quality is good. Only reason for 4 stars is that it took a bit longer to deliver than expected.',
    date: '2024-03-10T14:20:00Z',
    helpful: 8
  },
  {
    id: '3',
    productId: 'product2',
    userName: 'Amit Patel',
    rating: 5,
    comment: 'Perfect cricket jersey! The colors are vibrant and the stitching is excellent. My team loves these jerseys.',
    date: '2024-03-08T09:15:00Z',
    helpful: 15
  },
  {
    id: '4',
    productId: 'product2',
    userName: 'Neha Gupta',
    rating: 3,
    comment: 'Good quality but sizing runs a bit small. I ordered XL but it fits more like L. The design is nice though.',
    date: '2024-03-05T16:45:00Z',
    helpful: 6
  }
]

export const useReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    // Simulate loading reviews
    const loadReviews = async () => {
      try {
        setLoading(true)
        // In production, fetch from Firebase/API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setReviews(mockReviews)
        setError('')
      } catch (err) {
        setError('Failed to load reviews')
        console.error('Error loading reviews:', err)
      } finally {
        setLoading(false)
      }
    }

    loadReviews()
  }, [])

  const getProductReviews = (productId) => {
    return reviews.filter(review => review.productId === productId)
  }

  const addReview = async (newReview) => {
    try {
      // In production, save to Firebase/API
      await new Promise(resolve => setTimeout(resolve, 500))
      setReviews(prev => [newReview, ...prev])
      return newReview
    } catch (err) {
      console.error('Error adding review:', err)
      throw err
    }
  }

  const updateReview = async (reviewId, updates) => {
    try {
      // In production, update in Firebase/API
      await new Promise(resolve => setTimeout(resolve, 300))
      setReviews(prev =>
        prev.map(review =>
          review.id === reviewId ? { ...review, ...updates } : review
        )
      )
    } catch (err) {
      console.error('Error updating review:', err)
      throw err
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      // In production, delete from Firebase/API
      await new Promise(resolve => setTimeout(resolve, 300))
      setReviews(prev => prev.filter(review => review.id !== reviewId))
    } catch (err) {
      console.error('Error deleting review:', err)
      throw err
    }
  }

  return {
    reviews,
    loading,
    error,
    getProductReviews,
    addReview,
    updateReview,
    deleteReview
  }
}
