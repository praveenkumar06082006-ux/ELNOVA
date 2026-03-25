import { useMemo, useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ProductScrollSection } from '../components/ProductScrollSection'
import { useCategories } from '../hooks/useCategories'

const staticCategories = [
  { name: 'Offers', path: '/offers', text: 'text-white' },
  { name: 'Embroidery', path: '/embroidery', text: 'text-white' },
  { name: 'Sublimation', path: '/sublimation', text: 'text-white' },
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
         <span className="text-[28px] sm:text-4xl leading-tight">JUST Starting from</span>
         <span className="text-[32px] sm:text-5xl leading-tight whitespace-nowrap pt-1">₹ 319/- only</span>
      </span>
    ),
    subtitleBottom: 'Grab it soon',
  }
]

const Divider = () => (
  <div className="flex w-full items-center justify-center py-5 opacity-40">
    <div className="h-px w-1/4 bg-gradient-to-r from-transparent via-white to-transparent" />
    <div className="mx-3 h-1.5 w-1.5 rotate-45 bg-elnova-yellow" />
    <div className="h-px w-1/4 bg-gradient-to-l from-transparent via-white to-transparent" />
  </div>
)

export const HomePage = () => {
  const navigate = useNavigate()
  const { products, loading, error, favoriteIds, toggleFavorite } =
    useOutletContext()
  const { categories: remoteCategories } = useCategories()

  const [activeBanner, setActiveBanner] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  // Auto slide triggers every 12 seconds of inactivity
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length)
    }, 12000)
    return () => clearInterval(timer)
  }, [activeBanner])

  const handleTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe || isRightSwipe) {
      if (isLeftSwipe) {
        setActiveBanner((prev) => (prev + 1) % banners.length)
      } else {
        setActiveBanner((prev) => (prev - 1 + banners.length) % banners.length)
      }
    }
  }

  const bestSellingProducts = useMemo(() => products.slice(0, 4), [products])

  const getCategoryImage = (name) => {
    const lowerName = name.toLowerCase()

    // Strategy 1: Find a document where the ID or a "name" field matches the category
    let remote = remoteCategories.find(
      (c) => c.name?.toLowerCase() === lowerName || c.id?.toLowerCase() === lowerName
    )

    // Strategy 2: If no document ID matches, check if any document has a field strictly named after the category (e.g. { offers: 'http...' })
    if (!remote) {
      const docWithField = remoteCategories.find((c) => c[lowerName] || c[name])
      if (docWithField) {
        const val = docWithField[lowerName] || docWithField[name]
        if (typeof val === 'string' && (val.startsWith('http') || val.startsWith('data:image'))) {
          return val
        }
      }
    }

    if (!remote) return null

    // If Strategy 1 matched a document, aggressively find any valid image URL inside that document
    for (const key in remote) {
       if (typeof remote[key] === 'string' && (remote[key].startsWith('http') || remote[key].startsWith('data:image'))) {
          return remote[key]
       }
    }
    
    return remote.image || remote.imageUrl || remote.logo || remote.url || null
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
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {staticCategories.map((item) => {
            const image = getCategoryImage(item.name)
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`relative flex min-h-[160px] min-w-[200px] snap-center items-center justify-center overflow-hidden rounded-[20px] bg-[#3a1d60] text-center font-heading text-2xl leading-tight shadow-md ring-1 ring-white/10 transition-transform active:scale-95`}
              >
                {image && (
                  <img
                    src={image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                )}
              </button>
            )
          })}
        </div>
      </section>

      <Divider />

      <ProductScrollSection
        title="Best selling :"
        products={bestSellingProducts}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        loading={loading}
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
