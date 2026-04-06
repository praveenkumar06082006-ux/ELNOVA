import { ProductCard } from './ProductCard'
import { ProductCardSkeleton } from './ProductCardSkeleton'

export const SearchResults = ({ 
  searchResults, 
  searchTerm, 
  loading, 
  favoriteIds, 
  toggleFavorite, 
  trackWhatsAppClick,
  onClearSearch 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 pb-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCardSkeleton key={`search-skeleton-${index}`} layout="grid" />
        ))}
      </div>
    )
  }

  if (!searchTerm) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-white/60 bg-[#3a1d60] rounded-3xl ring-1 ring-white/10 shadow-lg mt-4">
        <div className="mb-4">
          <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">Start Searching</h3>
        <p className="text-sm">Type in the search box to find products</p>
      </div>
    )
  }

  if (searchResults.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center text-white/60 bg-[#3a1d60] rounded-3xl ring-1 ring-white/10 shadow-lg mt-4">
        <div className="mb-4">
          <svg className="w-16 h-16 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
        <p className="text-sm">No products found for "{searchTerm}"</p>
        <p className="text-xs mt-2">Try different keywords or check spelling</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6 mt-4">
        <h2 className="font-heading text-2xl text-white">
          Search Results
        </h2>
        <div className="text-sm font-medium text-white/80">
          {searchResults.length} Products Found
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pb-2 transition-opacity duration-300">
        {searchResults.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favoriteIds.includes(product.id)}
            onToggleFavorite={toggleFavorite}
            layout="grid"
            trackWhatsAppClick={trackWhatsAppClick}
          />
        ))}
      </div>
    </div>
  )
}
