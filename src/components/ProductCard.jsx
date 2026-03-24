import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react'

const sizes = ['S', 'M', 'L', 'XL']

export const ProductCard = ({
  product,
  isFavorite,
  onToggleFavorite,
  compact = false,
}) => {
  const categoryLabel = Array.isArray(product.category)
    ? product.category.join(', ')
    : String(product.category ?? '')

  const images = useMemo(
    () => (product.images?.length ? product.images : ['https://picsum.photos/200']),
    [product.images],
  )
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoSlideRef, setAutoSlideRef] = useState(null)
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(1)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')

  const stopAutoSlide = () => {
    if (autoSlideRef) {
      clearInterval(autoSlideRef)
      setAutoSlideRef(null)
    }
  }

  useEffect(() => {
    return () => {
      if (autoSlideRef) {
        clearInterval(autoSlideRef)
      }
    }
  }, [autoSlideRef])

  const startAutoSlide = () => {
    if (autoSlideRef || images.length < 2) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 1300)
    setAutoSlideRef(timer)
  }

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const whatsappMessage = encodeURIComponent(
    `Product: ${product.name}
Size: ${size}
Qty: ${qty}
Name: ${customerName || '-'}
Phone: ${phone || '-'}
Shipping: 4-7 days
Order confirmation: Same day`,
  )

  return (
    <article
      className={`rounded-3xl bg-white p-3 shadow-md ring-1 ring-black/5 ${
        compact ? 'min-w-[244px]' : 'w-full'
      }`}
    >
      <div
        className="relative overflow-hidden rounded-2xl bg-elnova-purple"
        onMouseEnter={startAutoSlide}
        onMouseLeave={stopAutoSlide}
        onTouchStart={startAutoSlide}
        onTouchEnd={stopAutoSlide}
      >
        <img
          src={images[activeIndex]}
          alt={product.name}
          className={`w-full object-cover ${compact ? 'h-36' : 'h-44'}`}
        />
        <button
          type="button"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/60 p-1.5"
          onClick={prevImage}
        >
          <ChevronLeft size={14} />
        </button>
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/60 p-1.5"
          onClick={nextImage}
        >
          <ChevronRight size={14} />
        </button>
        <button
          type="button"
          onClick={() => onToggleFavorite(product.id)}
          className="absolute right-2 top-2 rounded-full bg-white/85 p-1.5"
          aria-label="Toggle favorite"
        >
          <Heart
            size={14}
            className={isFavorite ? 'fill-red-500 text-red-500' : 'text-elnova-purple'}
          />
        </button>
      </div>

      <div className="space-y-2 pt-3">
        <h3 className="font-heading text-lg leading-tight text-elnova-purple">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-black">₹{product.price}</p>
        <p className="text-xs uppercase tracking-wide text-gray-500">
          {categoryLabel}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <select
            value={size}
            onChange={(event) => setSize(event.target.value)}
            className="rounded-xl border border-gray-200 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-elnova-purple/30"
          >
            {sizes.map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(event) => setQty(Math.max(1, Number(event.target.value) || 1))}
            className="rounded-xl border border-gray-200 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-elnova-purple/30"
          />
          <input
            type="text"
            placeholder="Your name"
            value={customerName}
            onChange={(event) => setCustomerName(event.target.value)}
            className="col-span-2 rounded-xl border border-gray-200 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-elnova-purple/30"
          />
          <input
            type="tel"
            placeholder="Phone number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className="col-span-2 rounded-xl border border-gray-200 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-elnova-purple/30"
          />
        </div>

        <a
          href={`https://wa.me/+919626291742?text=${whatsappMessage}`}
          target="_blank"
          rel="noreferrer"
          className="block rounded-full bg-elnova-yellow px-4 py-2 text-center text-sm font-semibold text-black shadow-sm"
        >
          Order Now
        </a>
      </div>
    </article>
  )
}
