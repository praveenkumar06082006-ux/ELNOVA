import { Star, User, Calendar, Trash2 } from 'lucide-react'

export const ReviewCard = ({ review, onDelete }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-elnova-yellow text-elnova-yellow' : 'text-white/30'}
      />
    ))
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  return (
    <div className="rounded-2xl bg-[#3a1d60] p-4 shadow-lg ring-1 ring-white/10 hover:ring-white/20 transition-all duration-300">
      {/* Header with user info and rating */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-white/10 p-2">
            <User size={20} className="text-white/60" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-sm">{review.userName}</h4>
            <div className="flex items-center gap-1 mt-1">
              {renderStars(review.rating)}
              <span className="text-xs text-white/60 ml-2">({review.rating}.0)</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-white/40 text-xs">
          <Calendar size={12} />
          <span>{formatDate(review.date)}</span>
        </div>
      </div>

      {/* Review comment */}
      <div className="text-white/80 text-sm leading-relaxed">
        <p>{review.comment}</p>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
        <span className="text-xs text-white/50">
          {review.helpful !== undefined && (
            <>
              {review.helpful} people found this helpful
            </>
          )}
        </span>
        {onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
            aria-label="Delete review"
          >
            <Trash2 size={12} />
            Delete
          </button>
        )}
      </div>
    </div>
  )
}
