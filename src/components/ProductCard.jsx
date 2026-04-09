import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart, X } from 'lucide-react'

const sizes = ['S', 'M', 'L', 'XL', 'XXL']

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  layout = 'list', // 'list', 'scroll', 'grid'
  initiallyExpanded = false,
  onClose,
  trackWhatsAppClick,
}) => {
  const categoryLabel = Array.isArray(product.category)
    ? product.category.join(', ')
    : String(product.category ?? '')

  const descText = product.shortDescription || product["short description"] || product.shortDescription || product.short_description || product.description || ''

  // Get sizes from Firebase product data
  const availableSizes = useMemo(() => {
    // Read from 'size' field in Firebase
    if (product.size && Array.isArray(product.size)) {
      return product.size.filter(Boolean)
    }
    if (product.size && typeof product.size === 'string') {
      return [product.size]
    }
    // Return empty array if no size data in Firebase
    return []
  }, [product.size])

  const [size, setSize] = useState('') // Start with empty, no pre-fill


  const images = useMemo(
    () => {
      // Handle different image formats from Firebase
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        return product.images.filter(Boolean)
      }
      // Handle single image string
      if (product.image && typeof product.image === 'string') {
        return [product.image]
      }
      // Handle single image in images field as string
      if (typeof product.images === 'string') {
        return [product.images]
      }
      // Fallback to placeholder
      return ['https://picsum.photos/400']
    },
    [product.images, product.image],
  )
  const [isExpanded, setIsExpanded] = useState(initiallyExpanded || false)
  const [showFullDesc, setShowFullDesc] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isImageExpanded, setIsImageExpanded] = useState(false)
  const [expandedImageIndex, setExpandedImageIndex] = useState(0)
  const [autoSlideRef, setAutoSlideRef] = useState(null)
  
  const [qtyRaw, setQtyRaw] = useState('1')
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleClose = () => {
    setIsExpanded(false)
    setIsImageExpanded(false)
    if (onClose) onClose()
  }

  const handleImageExpand = (index = 0) => {
    setExpandedImageIndex(index)
    setIsImageExpanded(true)
  }

  const handleImageClose = () => {
    setIsImageExpanded(false)
  }

  const stopAutoSlide = () => {
    if (autoSlideRef) {
      clearInterval(autoSlideRef)
      setAutoSlideRef(null)
    }
  }

  useEffect(() => {
    return () => {
      if (autoSlideRef) clearInterval(autoSlideRef)
    }
  }, [autoSlideRef])

  const startAutoSlide = () => {
    if (autoSlideRef || images.length < 2) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 1300)
    setAutoSlideRef(timer)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleOrder = (e) => {
    e.preventDefault()
    // Only validate size if sizes are available
    const sizeRequired = availableSizes.length > 0
    if ((sizeRequired && !size) || !qtyRaw || !customerName.trim() || !phone.trim()) {
      setErrorMsg(sizeRequired ? 'All details are mandatory (name, phone, size, quantity).' : 'All details are mandatory (name, phone, quantity).')
      return
    }
    const numQty = Number(qtyRaw)
    if (numQty < 1 || numQty > 99) {
      setErrorMsg('Quantity must be between 1 and 99.')
      return
    }
    setErrorMsg('')
    
    // Track WhatsApp click for analytics
    if (trackWhatsAppClick) {
      trackWhatsAppClick(product.id)
    }
    
    // Calculate total price
    const totalPrice = numQty * product.price
    
    // Only required fields for WhatsApp message
    const sizeText = size ? `SIZE : ${size}` : ''
    const whatsappMessage = encodeURIComponent(
      `NAME : ${product.name}\n${sizeText}\nQUANTITY : ${numQty}\nPRICE : ${totalPrice}\nCUSTOMER NAME : ${customerName}\nPHONE NO : ${phone}`,
    )
    window.open(`https://wa.me/+919626291742?text=${whatsappMessage}`, '_blank')
  }

  const handleQtyChange = (e) => {
    const val = e.target.value
    if (val === '') {
      setQtyRaw('')
      return
    }
    const num = parseInt(val, 10)
    if (!isNaN(num)) {
      setQtyRaw(String(num))
    }
  }

  // Collapsed View
  if (!isExpanded) {
    const layoutClasses = 
      layout === 'scroll' ? 'min-w-[180px] max-w-[180px]' : 
      layout === 'grid' ? 'w-full' : 'w-full'
      
    // Smaller height for 2-column layout so images aren't extremely tall
    const imgHeight = layout === 'list' ? 'h-64' : 'h-[180px]'

    return (
      <article
        onClick={() => setIsExpanded(true)}
        className={`cursor-pointer rounded-[20px] bg-[#3a1d60] p-3 shadow-lg ring-1 ring-white/10 transition-transform active:scale-95 flex flex-col ${layoutClasses}`}
      >
        <div className="relative overflow-hidden rounded-[14px]">
          <img
            src={images[0]}
            alt={product.name}
            className={`w-full object-cover ${imgHeight} cursor-pointer hover:scale-105 transition-transform duration-300`}
            onClick={(e) => {
              // Don't expand image, let the card expansion handle this
              // This will trigger the parent card click to expand the product
            }}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(product.id)
            }}
            className="absolute right-2 top-2 rounded-full bg-black/40 p-1.5 backdrop-blur-sm"
            aria-label="Toggle favorite"
          >
            <Heart
              size={16}
              className={isFavorite ? 'fill-elnova-yellow text-elnova-yellow' : 'text-white'}
            />
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-end space-y-1 pt-3">
          <h3 className="truncate font-heading text-lg leading-tight text-white">
            {product.name}
          </h3>
          <p className="text-sm font-semibold text-elnova-yellow">₹{product.price}</p>
        </div>
      </article>
    )
  }

  // Expanded View (Modal Overlay)
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-elnova-purple overflow-y-auto">
      <div className="sticky top-0 z-10 flex items-center justify-between bg-elnova-purple/95 px-4 py-4 backdrop-blur-md border-b border-white/10">
        <h2 className="font-heading text-xl text-white truncate pr-4">{product.name}</h2>
        <button
          onClick={handleClose}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <div className="px-4 pb-8 pt-4 space-y-6">
        <div
          className="relative w-full overflow-hidden rounded-[24px] bg-black/20 ring-1 ring-white/10 shadow-xl"
        >
          <img
             src={images[activeIndex]}
             alt={product.name}
             className="w-full h-[320px] object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
             onClick={() => {
               handleImageExpand(activeIndex)
             }}
          />
          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
                onClick={prevImage}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-2 text-white backdrop-blur-md hover:bg-black/60 transition-colors"
                onClick={nextImage}
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(product.id)
            }}
            className="absolute right-3 top-3 rounded-full bg-black/40 p-2 backdrop-blur-md hover:bg-black/60 transition-colors"
            aria-label="Toggle favorite"
          >
            <Heart
              size={20}
              className={isFavorite ? 'fill-elnova-yellow text-elnova-yellow' : 'text-white'}
            />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === activeIndex ? 'w-5 bg-elnova-yellow' : 'w-1.5 bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2 px-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-[28px] leading-tight text-white">{product.name}</h3>
            <p className="text-2xl font-bold text-elnova-yellow">₹{product.price}</p>
          </div>
          <p className="text-sm font-medium uppercase tracking-wider text-white/50">
            {categoryLabel}
          </p>
          {descText && (
            <div className="pt-2 flex flex-col items-start">
              <p className={`text-base text-white/85 leading-relaxed whitespace-pre-wrap transition-all ${!showFullDesc ? 'line-clamp-3' : ''}`}>
                {descText}
              </p>
              <button 
                type="button"
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="mt-1 flex items-center gap-1 text-sm font-medium text-elnova-yellow hover:text-yellow-400 transition-colors"
              >
                {showFullDesc ? 'Show Less' : 'Show More'}
                <svg className={`w-4 h-4 transition-transform ${showFullDesc ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>

        <form className="space-y-3 rounded-[24px] bg-[#3a1d60] p-3 shadow-lg ring-1 ring-white/10" onSubmit={handleOrder}>
          <h4 className="font-heading text-xl text-white mb-2">Order Details</h4>
          
          <div className="grid grid-cols-2 gap-4">
            {availableSizes.length > 0 && (
            <div className="space-y-1.5 flex flex-col">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Size <span className="text-elnova-peach">*</span></label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((sizeOption) => {
                  const isAvailable = availableSizes.includes(sizeOption)
                  return (
                    <button
                      key={sizeOption}
                      type="button"
                      onClick={() => isAvailable && setSize(sizeOption)}
                      disabled={!isAvailable}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isAvailable
                          ? size === sizeOption
                            ? 'bg-elnova-yellow text-black'
                            : 'bg-white/10 text-white hover:bg-white/20'
                          : 'bg-white/5 text-white/30 cursor-not-allowed relative'
                      }`}
                    >
                      {sizeOption}
                      {!isAvailable && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-0.5 bg-white/50 rotate-45"></div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
            
            <div className="space-y-1.5 flex flex-col">
               <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Quantity <span className="text-elnova-peach">*</span></label>
               <input
                 type="text"
                 value={qtyRaw === '' ? '' : qtyRaw}
                 placeholder="nil"
                 onChange={handleQtyChange}
                 className="w-full rounded-xl border border-white/20 bg-white/5 px-2 py-2 sm:px-3 sm:py-3 text-sm text-white outline-none focus:border-elnova-yellow focus:ring-1 focus:ring-elnova-yellow placeholder:text-white/30"
                 required
               />
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Full Name <span className="text-elnova-peach">*</span></label>
              <input
                type="text"
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-elnova-yellow focus:ring-1 focus:ring-elnova-yellow placeholder:text-white/30"
                required
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Phone Number <span className="text-elnova-peach">*</span></label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/5 px-3 py-3 text-sm text-white outline-none focus:border-elnova-yellow focus:ring-1 focus:ring-elnova-yellow placeholder:text-white/30"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-xl bg-red-500/10 p-3 mt-2">
               <p className="text-sm font-medium text-red-300">{errorMsg}</p>
            </div>
          )}

          <button
            type="submit"
            className="mt-4 w-full rounded-full bg-elnova-yellow py-3 text-center text-sm font-bold uppercase tracking-wide text-black shadow-lg shadow-elnova-yellow/20 transition-transform hover:scale-[1.02] active:scale-95"
          >
            Confirm & Order via WhatsApp
          </button>
        </form>
      </div>

      {/* Image Expansion Modal */}
      {isImageExpanded && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={handleImageClose}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            
            <div className="relative">
              <img
                src={images[expandedImageIndex]}
                alt={`${product.name} - Image ${expandedImageIndex + 1}`}
                className="w-full h-full object-contain rounded-xl"
              />
              
              {/* Image navigation */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setExpandedImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() => setExpandedImageIndex((prev) => (prev + 1) % images.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
              
              {/* Image indicators */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                  {images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setExpandedImageIndex(i)}
                      className={`h-2 w-2 rounded-full transition-all ${
                        i === expandedImageIndex
                          ? 'w-8 bg-elnova-yellow'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                      aria-label={`Go to image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
