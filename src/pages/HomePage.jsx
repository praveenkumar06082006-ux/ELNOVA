import { useMemo } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ProductScrollSection } from '../components/ProductScrollSection'

const categories = [
  { name: 'Offers', path: '/offers', text: 'text-white' },
  { name: 'Embroidery', path: '/embroidery', text: 'text-white' },
  { name: 'Sublimation', path: '/sublimation', text: 'text-white' },
]

export const HomePage = () => {
  const navigate = useNavigate()
  const { products, loading, error, favoriteIds, toggleFavorite } =
    useOutletContext()

  const bestSellingProducts = useMemo(() => products.slice(0, 4), [products])

  return (
    <div className="space-y-6 px-4 pb-6">
      <section className="rounded-[22px] bg-elnova-purple px-4 py-7 text-center shadow-md">
        <p className="mb-1.5 text-xs text-elnova-peach">Wear the energy within</p>
        <h1 className="font-heading text-[36px] leading-tight text-white">
          PREMIUM JERSEYS
        </h1>
        <p className="mb-4 mt-1.5 text-base text-white/95">with affordable price</p>
        <button
          type="button"
          onClick={() => navigate('/offers')}
          className="rounded-full bg-elnova-yellow px-6 py-2 text-sm font-semibold text-black"
        >
          Buy Now
        </button>
      </section>

      <div className="h-px w-full bg-black/80" />

      <section className="rounded-[22px] bg-white p-3 shadow-md ring-1 ring-black/5">
        <div className="rounded-[18px] bg-white p-1.5">
          <h2 className="mb-4 px-1 font-heading text-xl text-black">Categories</h2>
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item.name}
                type="button"
                onClick={() => navigate(item.path)}
                className={`flex min-h-[114px] min-w-[140px] items-center justify-center rounded-2xl bg-elnova-purple px-4 py-6 text-center font-heading text-[21px] leading-tight ${item.text}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </section>
      <ProductScrollSection
        title="Best Selling"
        products={bestSellingProducts}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        loading={loading}
        dark
      />
      {!loading && error && (
        <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}
    </div>
  )
}
