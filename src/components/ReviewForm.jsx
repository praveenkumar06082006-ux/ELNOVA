import { useState } from 'react'
import { Star, Send, Camera, X } from 'lucide-react'

export const ReviewForm = ({ productId, onSubmitReview }) => {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [userName, setUserName] = useState('')
  const [comment, setComment] = useState('')
  const [photo, setPhoto] = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = (event) => {
        const result = event.target.result
        setPhoto(result)
        setPhotoPreview(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePhoto = () => {
    setPhoto(null)
    setPhotoPreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (rating === 0 || !userName.trim() || !comment.trim()) {
      return
    }

    setIsSubmitting(true)
    
    const newReview = {
      id: Date.now().toString(),
      productId,
      userName: userName.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString(),
      helpful: 0,
      photo: photo, // Include photo if uploaded
    }

    try {
      await onSubmitReview(newReview)
      // Reset form
      setRating(0)
      setHoverRating(0)
      setUserName('')
      setComment('')
      setPhoto(null)
      setPhotoPreview(null)
    } catch (error) {
      console.error('Error submitting review:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStarButton = (starValue) => (
    <button
      type="button"
      onClick={() => setRating(starValue)}
      onMouseEnter={() => setHoverRating(starValue)}
      onMouseLeave={() => setHoverRating(0)}
      className="transition-all duration-200 transform hover:scale-110"
    >
      <Star
        size={32}
        className={
          starValue <= (hoverRating || rating)
            ? 'fill-elnova-yellow text-elnova-yellow'
            : 'text-white/30 hover:text-white/50'
        }
      />
    </button>
  )

  return (
    <div className="rounded-2xl bg-[#3a1d60] p-6 shadow-lg ring-1 ring-white/10">
      <h3 className="font-heading text-xl text-white mb-6">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Photo Upload Section */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Photo (Optional)
          </label>
          <div className="flex items-center gap-4">
            {photoPreview ? (
              <div className="relative">
                <img
                  src={photoPreview}
                  alt="Review photo preview"
                  className="w-24 h-24 rounded-xl object-cover border-2 border-white/20"
                />
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1.5 text-white hover:bg-red-600 transition-colors"
                  aria-label="Remove photo"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center bg-white/5">
                <Camera className="text-white/40" size={32} />
              </div>
            )}
            
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
          </div>
        </div>

        {/* Star Rating */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-3">
            Your Rating *
          </label>
          <div className="flex gap-2">
            {Array.from({ length: 5 }, (_, i) => renderStarButton(i + 1))}
          </div>
          {rating > 0 && (
            <p className="text-xs text-elnova-yellow mt-2">
              {rating === 5 && 'Excellent!'}
              {rating === 4 && 'Very Good'}
              {rating === 3 && 'Good'}
              {rating === 2 && 'Fair'}
              {rating === 1 && 'Poor'}
            </p>
          )}
        </div>

        {/* User Name */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder=""
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-elnova-yellow focus:ring-2 focus:ring-elnova-yellow/20 placeholder:text-white/30"
            required
          />
        </div>

        {/* Comment */}
        <div>
          <label className="block text-sm font-medium text-white/70 mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder=""
            rows={4}
            className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-elnova-yellow focus:ring-2 focus:ring-elnova-yellow/20 placeholder:text-white/30 resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0 || !userName.trim() || !comment.trim() || isSubmitting}
          className="w-full rounded-full bg-elnova-yellow py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-elnova-yellow/20 transition-all duration-200 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Submitting...
            </>
          ) : (
            <>
              <Send size={16} />
              Submit Review
            </>
          )}
        </button>
      </form>
    </div>
  )
}
