import { useState } from 'react'
import { ReviewCard } from './ReviewCard'
import { ReviewForm } from './ReviewForm'

export const ReviewSection = ({ productId, reviews = [], onAddReview }) => {
  const [showForm, setShowForm] = useState(false)

  const handleAddReview = async (newReview) => {
    await onAddReview(newReview)
    setShowForm(false)
  }

  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach(review => {
      distribution[review.rating]++
    })
    return distribution
  }

  const averageRating = calculateAverageRating()
  const distribution = getRatingDistribution()

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="rounded-2xl bg-[#3a1d60] p-6 shadow-lg ring-1 ring-white/10">
        <h3 className="font-heading text-2xl text-white mb-6">Customer Reviews</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-elnova-yellow mb-2">
              {averageRating}
            </div>
            <div className="flex justify-center gap-1 mb-2">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i < Math.floor(averageRating)
                      ? 'bg-elnova-yellow'
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <p className="text-white/60 text-sm">
              Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {Object.entries(distribution)
              .reverse()
              .map(([rating, count]) => {
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-white/60 text-sm w-8">{rating}*</span>
                    <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-elnova-yellow transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-white/60 text-sm w-8 text-right">
                      {count}
                    </span>
                  </div>
                )
              })}
          </div>
        </div>
      </div>

      {/* Add Review Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-full bg-elnova-yellow py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-elnova-yellow/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
        >
          Write a Review
        </button>
      )}

      {/* Review Form */}
      {showForm && (
        <ReviewForm
          productId={productId}
          onSubmitReview={handleAddReview}
        />
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-white/40 mb-2">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-white/60">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          <>
            <h4 className="font-heading text-lg text-white">All Reviews</h4>
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
