import { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ProductScrollSection } from '../components/ProductScrollSection'
import { useCategories } from '../hooks/useCategories'

const staticCategories = [
  { name: 'Offers', path: '/offers', text: 'text-white' },
  { name: 'Embroidery', path: '/embroidery', text: 'text-white' },
  { name: 'Sublimation', path: '/sublimation', text: 'text-white' },
]

export const HomePage = () => {
  const navigate = useNavigate()
  const { products, loading, error, favoriteIds, toggleFavorite } =
    useOutletContext()
  const { categories: remoteCategories } = useCategories()

  const bestSellingProducts = useMemo(() => products.slice(0, 4), [products])

  const getCategoryImage = (name) => {
    const remote = remoteCategories.find(
      (c) =>
        c.name?.toLowerCase() === name.toLowerCase() ||
        c.id?.toLowerCase() === name.toLowerCase(),
    )
    return remote?.image || remote?.imageUrl || remote?.logo || null
  }

  return (
    <div className="flex w-full flex-col gap-6 pb-6">
      <section className="w-full bg-elnova-purple px-4 py-16 text-center">
        <p className="mb-1.5 text-xs text-white/80 tracking-widest uppercase">Wear the energy within</p>
        <h1 className="font-heading text-5xl leading-tight text-white mb-2">
          PREMIUM JERSEYS
        </h1>
        <p className="mb-6 text-lg text-white/90">with affordable price</p>
        <button
          type="button"
          onClick={() => navigate('/offers')}
          className="rounded-full bg-elnova-yellow px-8 py-3 text-base font-bold text-black hover:bg-yellow-400 transition-colors"
        >
          Buy Now
        </button>
      </section>

      <section className="w-full px-3">
        <h2 className="mb-4 px-1 font-heading text-2xl text-white">
          Categories :
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {staticCategories.map((item) => {
            const image = getCategoryImage(item.name)
            return (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`relative flex min-h-[160px] min-w-[200px] items-center justify-center overflow-hidden rounded-[20px] bg-[#3a1d60] text-center font-heading text-2xl leading-tight ${item.text}`}
              >
                {image && (
                  <img
                    src={image}
                    alt={item.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-overlay transition-opacity hover:opacity-80"
                  />
                )}
                <span className="relative z-10 drop-shadow-lg">{item.name}</span>
              </button>
            )
          })}
        </div>
      </section>

      <ProductScrollSection
        title="Best selling :"
        products={bestSellingProducts}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        loading={loading}
      />

      {!loading && error && (
        <div className="px-3">
          <p className="rounded-2xl bg-red-500/10 p-4 text-sm text-red-200">
            {error}
          </p>
        </div>
      )}
    </div>
  )
}
