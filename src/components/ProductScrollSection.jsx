import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'

export const ProductScrollSection = ({
  title,
  products,
  favoriteIds,
  toggleFavorite,
  dark = false,
  loading = false,
}) => {
  return (
    <section
      className={`space-y-3 rounded-[22px] px-3.5 py-3.5 ${
        dark ? 'bg-elnova-purple' : 'bg-white'
      }`}
    >
      <h2
        className={`font-heading text-[26px] leading-none ${
          dark ? 'text-white' : 'text-elnova-purple'
        }`}
      >
        {title}
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-1">
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
