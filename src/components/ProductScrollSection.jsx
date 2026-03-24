import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'

export const ProductScrollSection = ({
  title,
  products,
  favoriteIds,
  toggleFavorite,
  loading = false,
}) => {
  return (
    <section className="w-full px-3 py-2">
      <h2 className="mb-4 px-1 font-heading text-2xl text-white">
        {title}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {loading
          ? Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={`skeleton-${index}`} compact />
            ))
          : products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favoriteIds.includes(product.id)}
                onToggleFavorite={toggleFavorite}
                compact
              />
            ))}
      </div>
    </section>
  )
}
