import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductScrollSection } from '../components/ProductScrollSection'
import { useOutletContext } from 'react-router-dom'
import { useCategories } from '../hooks/useCategories'
import { useAnalytics } from '../hooks/useAnalytics'

const staticCategories = [
  { name: 'Offers', path: '/offers', text: 'text-white' },
  { name: 'Embroidery', path: '/embroidery', text: 'text-white' },
  { name: 'Sublimation', path: '/sublimation', text: 'text-white' },
  { name: 'Cricket', path: '/cricket', text: 'text-white' },
]

const banners = [
  {
    subtitleTop: 'Wear the energy within',
    title: <span className="block text-4xl sm:text-5xl leading-tight">PREMIUM JERSEYS</span>,
    subtitleBottom: 'with affordable price',
  },
  {
    subtitleTop: <span className="text-elnova-yellow">Limited offers</span>,
    title: (
      <span className="flex flex-col items-center justify-center">
         <span className="text-[28px] sm:text-4xl leading-tight whitespace-nowrap pt-1">JUST Starting from</span>
         <span className="text-[32px] sm:text-5xl leading-tight whitespace-nowrap pt-1">₹ 319/- only</span>
      </span>
    ),
    subtitleBottom: 'Grab it soon',
  }
]

const Divider = () => (
  <div className="flex w-full items-center justify-center py-5 opacity-40">
    <div className="h-px w-1/4 bg-gradient-to-r from-transparent via-white to-transparent" />
    <div className="mx-3 h-1.5 w-1.5 rotate-45 bg-elnova-yellow rounded-full" />
    <div className="h-px w-1/4 bg-gradient-to-l from-transparent via-white to-transparent" />
  </div>
)

export const HomePage = () => {
  const navigate = useNavigate()
  const { products, loading, error, favoriteIds, toggleFavorite, trackWhatsAppClick } =
    useOutletContext()
  const { categories: remoteCategories } = useCategories()
  const { getBestSellingProducts } = useAnalytics()

  const [activeBanner, setActiveBanner] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [hoveredCategory, setHoveredCategory] = useState(null)
  const [touchedCategory, setTouchedCategory] = useState(null)

  // Auto slide triggers every 12 seconds of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length)
    }, 12000)
    return () => clearInterval(timer)
  }, [activeBanner])

  const getCategoryImage = (categoryName) => {
    const category = staticCategories.find(
      (c) => c.name?.toLowerCase() === categoryName.toLowerCase()
    )
    return category?.image || category?.imageUrl || category?.logo || category?.url || null
  }

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0]?.clientX)
    setTouchedCategory(null) // Reset touched category when starting new touch
  }

  const handleTouchMove = (e) => {
    if (e.buttons === 1) {
      setTouchStart({ targetTouches: [{ clientX: e.clientX }] })
    }
  }

  const handleTouchEnd = () => {
    if (touchStart) {
      handleTouchMove()
    }
    setTouchStart(null)
    setTouchedCategory(hoveredCategory) // Set touched category to the hovered one
  }

  const getCategoryImage = (categoryName) => {
    const category = staticCategories.find(
      (c) => c.name?.toLowerCase() === categoryName.toLowerCase()
    )
    return category?.image || category?.imageUrl || category?.logo || category?.url || null
  }

  return (
    <div className="flex w-full flex-col gap-2 pb-6">
      <section 
        className="relative w-full bg-elnova-purple px-4 py-8 text-center overflow-hidden min-h-[240px] flex flex-col justify-center cursor-grab active:cursor-grabbing"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={(e) => { if(e.buttons === 1) handleTouchMove({ targetTouches: [{ clientX: e.clientX }]}) }}
        onMouseUp={handleTouchEnd}
        onMouseLeave={() => { if(touchStart) handleTouchEnd() }}
      >
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out ${
              index === activeBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute pointer-events-none'
            } ${
              index < activeBanner ? '-translate-x-full' : ''
            }`}
          >
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
              {banner.subtitleTop}
            </p>
            <h1 className="font-heading text-white mb-3 tracking-wide w-full flex flex-col justify-center items-center">
              {banner.title}
            </h1>
            <p className="mb-6 text-base tracking-wide text-white/90">
              {banner.subtitleBottom}
            </p>
          </div>
        ))}
        
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
           {banners.map((_, i) => (
             <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeBanner ? 'w-6 bg-elnova-yellow' : 'w-2 bg-white/40'}`} />
           ))}
        </div>
      </section>

      <div className="px-4 mt-2">
        <button
          type="button"
          onClick={() => navigate('/offers')}
          className="w-full rounded-full bg-elnova-yellow px-8 py-3 text-base font-bold uppercase tracking-wide text-black hover:bg-yellow-400 transition-transform active:scale-95 shadow-[0_4px_14px_rgba(255,216,77,0.3)]"
        >
          Buy Now
        </button>
      </div>

      <Divider />

      <section className="w-full px-3">
        <h2 className="mb-4 px-1 font-heading text-2xl text-white">
          Categories :
        </h2>
        <div className="flex gap-8 overflow-x-auto pb-2 scrollbar-none snap-x">
          {staticCategories.map((item) => {
            const image = getCategoryImage(item.name)
            const isHovered = hoveredCategory === item.name || touchedCategory === item.name
            const isTouched = touchedCategory === item.name
            
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                onMouseEnter={() => setHoveredCategory(item.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                className={`relative flex-shrink-0 rounded-[20px] overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isHovered || isTouched 
                    ? 'ring-2 ring-elnova-yellow scale-110' 
                    : 'ring-1 ring-white/10 hover:bg-white/20'
                }`}
              >
                {/* Circular Image */}
                <div
                  className={`relative w-48 h-48 rounded-full overflow-hidden transition-all duration-300 ${
                    isHovered || isTouched 
                      ? 'bg-elnova-yellow/20 ring-2 ring-elnova-yellow scale-110' 
                      : 'bg-white/10 ring-1 ring-white/10 hover:bg-white/20'
                  }`}
                >
                  {image && (
                    <img
                      src={image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                {/* Category Name */}
                <div className="absolute inset-x-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black/80 backdrop-blur-sm rounded-b-[20px] p-2 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  <p className={`text-white font-semibold text-sm transition-colors duration-200 ${
                    isHovered || isTouched 
                      ? 'text-elnova-yellow' 
                      : 'text-white'
                  }`}>{item.name}</p>
                </div>
              </button>
            )
          })}
        </div>
      </section>

      <Divider />

      <ProductScrollSection
        title="Best selling :"
        products={getBestSellingProducts()}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        loading={loading}
        trackWhatsAppClick={trackWhatsAppClick}
      />

      {!loading && error && (
        <div className="px-3 mt-4">
          <p className="rounded-2xl bg-red-500/10 p-4 text-sm font-medium text-red-200">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
