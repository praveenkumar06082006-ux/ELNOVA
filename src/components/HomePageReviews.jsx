import { useState } from 'react'
import { ReviewCard } from './ReviewCard'
import { ReviewForm } from './ReviewForm'
import { Star, ChevronRight, MessageCircle, Plus } from 'lucide-react'

export const HomePageReviews = ({ reviews = [], onAddReview, onDeleteReview }) => {
  const [showForm, setShowForm] = useState(false)
  
  // Always show all reviews, form is separate
  const displayedReviews = reviews
  
  const calculateAverageRating = () => {
    if (reviews.length === 0) return 0
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0)
    return (sum / reviews.length).toFixed(1)
  }

  const renderStars = (rating, size = 'small') => {
    const starSize = size === 'large' ? 24 : 16
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={starSize}
        className={i < rating ? 'fill-elnova-yellow text-elnova-yellow' : 'text-white/30'}
      />
    ))
  }

  const averageRating = calculateAverageRating()

  return (
    <section className="w-full px-4 py-12 bg-gradient-to-b from-transparent to-[#2b1548]/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageCircle className="text-elnova-yellow" size={28} />
            <h2 className="font-heading text-3xl sm:text-4xl text-white">Customer Reviews</h2>
          </div>
          
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {renderStars(Math.floor(averageRating), 'large')}
              <span className="text-2xl font-bold text-elnova-yellow ml-2">
                {averageRating}
              </span>
            </div>
            <div className="text-white/60">
              <span className="font-semibold">{reviews.length}</span> Reviews
            </div>
          </div>
          
          <p className="text-white/70 max-w-2xl mx-auto">
            Real reviews from real customers. Share your experience with our products!
          </p>
        </div>

        {/* Add Review Button */}
        {!showForm && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-elnova-yellow px-8 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-elnova-yellow/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              <Plus size={16} />
              Write a Review
            </button>
          </div>
        )}

        {/* Review Form */}
        {showForm && (
          <div className="mb-8">
            <ReviewForm onSubmitReview={onAddReview} />
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <div key={review.id} className="transform transition-all duration-300 hover:scale-105">
              <ReviewCard 
                review={review} 
                onDelete={onDeleteReview}
              />
            </div>
          ))}
        </div>

        {/* See More Button */}
        {reviews.length > 3 && (
          <div className="text-center">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-full bg-elnova-yellow px-8 py-3 text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-elnova-yellow/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
            >
              Write a Review
              <ChevronRight 
                size={16} 
              />
            </button>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-elnova-yellow/20 flex items-center justify-center">
              <Star className="text-elnova-yellow" size={24} />
            </div>
            <h4 className="font-semibold text-white mb-1">{averageRating}/5 Rating</h4>
            <p className="text-xs text-white/60">Average Customer Rating</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-elnova-yellow/20 flex items-center justify-center">
              <svg className="text-elnova-yellow" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-1">Quality</h4>
            <p className="text-xs text-white/60">Premium Products</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-elnova-yellow/20 flex items-center justify-center">
              <svg className="text-elnova-yellow" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
              </svg>
            </div>
            <h4 className="font-semibold text-white mb-1">Support</h4>
            <p className="text-xs text-white/60">24/7 Help Center</p>
          </div>
        </div>
      </div>
    </section>
  )
}
