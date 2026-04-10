import { useState, useEffect } from 'react'

// Storage key for reviews
const REVIEWS_STORAGE_KEY = 'elnova_reviews'

export const useReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load reviews from localStorage on mount
  useEffect(() => {
    const loadReviews = () => {
      try {
        setLoading(true)
        const storedReviews = localStorage.getItem(REVIEWS_STORAGE_KEY)
        const parsedReviews = storedReviews ? JSON.parse(storedReviews) : []
        
        // If no reviews, add sample reviews for testing
        if (parsedReviews.length === 0) {
          const sampleReviews = [
            {
              id: 'sample1',
              userName: 'John Doe',
              rating: 5,
              comment: 'Excellent quality jersey! The material is very comfortable and fits perfectly.',
              date: new Date().toISOString(),
              productId: 'general',
              helpful: 0,
              photo: null
            },
            {
              id: 'sample2', 
              userName: 'Jane Smith',
              rating: 4,
              comment: 'Great product overall. Fast delivery and good packaging.',
              date: new Date(Date.now() - 86400000).toISOString(),
              productId: 'general',
              helpful: 0,
              photo: null
            }
          ]
          localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(sampleReviews))
          setReviews(sampleReviews)
        } else {
          // Sort by date (newest first)
          const sortedReviews = parsedReviews.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
          )
          
          setReviews(sortedReviews)
        }
        
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

  // Save reviews to localStorage
  const saveReviews = (updatedReviews) => {
    try {
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(updatedReviews))
      setReviews(updatedReviews)
    } catch (err) {
      console.error('Error saving reviews:', err)
      throw err
    }
  }

  // Get all reviews for display
  const getAllReviews = () => {
    return reviews.sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Add a new review
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

      const newReview = {
        id: Date.now().toString(),
        userName: reviewData.userName.trim(),
        rating: reviewData.rating,
        comment: reviewData.comment.trim(),
        date: new Date().toISOString(),
        productId: reviewData.productId || 'general', // Can be product-specific or general
        helpful: 0,
        photo: reviewData.photo || null // Support for photo attachment
      }

      const updatedReviews = [newReview, ...reviews]
      saveReviews(updatedReviews)
      return newReview
    } catch (err) {
      console.error('Error adding review:', err)
      throw err
    }
  }

  // Delete a review (user can delete their own)
  const deleteReview = async (reviewId) => {
    try {
      const updatedReviews = reviews.filter(review => review.id !== reviewId)
      saveReviews(updatedReviews)
    } catch (err) {
      console.error('Error deleting review:', err)
      throw err
    }
  }

  // Get reviews for a specific product (optional)
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
    getAllReviews,
    addReview,
    deleteReview,
    getProductReviews,
    getAverageRating,
    getRatingDistribution
  }
}
