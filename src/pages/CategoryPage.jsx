import { useMemo } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { useOutletContext } from 'react-router-dom'

const categoryTitles = {
  offers: 'Offers',
  embroidery: 'Embroidery',
  sublimation: 'Sublimation',
}

export const CategoryPage = ({ category }) => {
  const { products, loading, error, favoriteIds, toggleFavorite } =
    useOutletContext()

  const filteredProducts = useMemo(
    () =>
      products.filter((item) => {
        if (Array.isArray(item.category)) {
          return item.category.includes(category.toLowerCase())
        }

        return String(item.category ?? '').toLowerCase() === category.toLowerCase()
      }),
    [category, products],
  )

  return (
    <section className="space-y-4 bg-white px-4 pb-6">
      <h1 className="font-heading text-3xl text-elnova-purple">
        {categoryTitles[category]}
      </h1>
      {loading ? (
        <div className="grid gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ProductCardSkeleton key={`category-skeleton-${index}`} />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-2xl bg-red-50 p-4 text-sm text-red-700">{error}</p>
      ) : filteredProducts.length === 0 ? (
        <p className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-600">
          No products found in this category.
        </p>
      ) : (
        <div className="grid gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favoriteIds.includes(product.id)}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}
