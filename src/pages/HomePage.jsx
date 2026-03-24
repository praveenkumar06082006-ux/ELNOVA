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
    title: 'PREMIUM JERSEYS',
    subtitleBottom: 'with affordable price',
  },
  {
    subtitleTop: 'Limited offers',
    title: 'JUST Starting from ₹ 319/- only',
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

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % banners.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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
      <section className="relative w-full bg-elnova-purple px-4 py-16 text-center overflow-hidden min-h-[260px] flex flex-col justify-center">
        {banners.map((banner, index) => (
          <div 
            key={index} 
            className={`absolute inset-0 flex flex-col items-center justify-center px-4 transition-all duration-700 ease-in-out ${
              index === activeBanner ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'
            } ${
              index < activeBanner ? '-translate-x-full' : ''
            }`}
          >
            <p className="mb-2 text-xs font-semibold tracking-[0.2em] uppercase text-white/80">
              {banner.subtitleTop}
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl leading-tight text-white mb-3 tracking-wide">
              {banner.title}
            </h1>
            <p className="mb-8 text-base tracking-wide text-white/90">
              {banner.subtitleBottom}
            </p>
          </div>
        ))}
        
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
           {banners.map((_, i) => (
             <div key={i} className={`h-1.5 rounded-full transition-all ${i === activeBanner ? 'w-6 bg-elnova-yellow' : 'w-2 bg-white/40'}`} />
           ))}
        </div>
      </section>

      <div className="px-4">
        <button
          type="button"
          onClick={() => navigate('/offers')}
          className="w-full rounded-full bg-elnova-yellow px-8 py-3.5 text-base font-bold uppercase tracking-wide text-black hover:bg-yellow-400 transition-transform active:scale-95 shadow-lg"
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
                className={`relative flex min-h-[160px] min-w-[200px] snap-center items-center justify-center overflow-hidden rounded-[20px] bg-[#3a1d60] text-center font-heading text-2xl leading-tight shadow-md ring-1 ring-white/10 transition-transform active:scale-95 ${item.text}`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                ) : (
                  <span className="relative z-10 drop-shadow-lg opacity-50">{item.name}</span>
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
