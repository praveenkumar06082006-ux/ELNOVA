import { useMemo, useState, useEffect } from 'react'
import { ProductCard } from '../components/ProductCard'
import { ProductCardSkeleton } from '../components/ProductCardSkeleton'
import { useOutletContext } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useAnalytics } from '../hooks/useAnalytics'

const categoryTitles = {
  offers: 'Offers',
  embroidery: 'Embroidery',
  sublimation: 'Sublimation',
}

export const CategoryPage = ({ category }) => {
  const { products, loading, error, favoriteIds, toggleFavorite, trackWhatsAppClick } =
    useOutletContext()
  const { getBestSellingProducts } = useAnalytics()

  const [currentPage, setCurrentPage] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [priceFilter, setPriceFilter] = useState('all')
  const [sizeFilter, setSizeFilter] = useState('all')

  const itemsPerPage = 10

  // Reset page when category or filters change
  useEffect(() => {
    setCurrentPage(0)
  }, [category, priceFilter, sizeFilter])

  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      if (Array.isArray(item.category)) {
        return item.category.some(cat => 
          String(cat ?? '').trim().toLowerCase() === category.toLowerCase()
        )
      }
      return String(item.category ?? '').trim().toLowerCase() === category.toLowerCase()
    })

    // Apply price filter
    if (priceFilter !== 'all') {
      result = result.filter(item => {
        if (priceFilter === 'low-to-high') {
          return true // Show all products for sorting
        } else if (priceFilter === 'high-to-low') {
          return true // Show all products for sorting
        }
        return true
      })
    }

    // Apply size filter
    if (sizeFilter !== 'all') {
      result = result.filter(item => {
        if (item.size && Array.isArray(item.size)) {
          return item.size.includes(sizeFilter)
        }
        if (item.size && typeof item.size === 'string') {
          return item.size === sizeFilter
        }
        return false
      })
    }

    // Sort by price if high-to-low selected
    if (priceFilter === 'high-to-low') {
      result.sort((a, b) => b.price - a.price)
    } else if (priceFilter === 'low-to-high') {
      result.sort((a, b) => a.price - b.price)
    }

    return result
  }, [category, products, priceFilter, sizeFilter])

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
  }, [filteredProducts, currentPage, itemsPerPage])

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
    
    if (isLeftSwipe && currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1)
    } else if (isRightSwipe && currentPage > 0) {
      setCurrentPage((prev) => prev - 1)
    }
  }

  return (
    <section className="flex w-full flex-col px-4 pb-8 min-h-[70vh]">
      {/* Category Header with Circular Images */}
      <div className="flex items-center justify-between mb-6 mt-4">
        <h1 className="font-heading text-3xl text-white">
          {categoryTitles[category]}
        </h1>
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5 text-white/50 bg-black/20 rounded-full px-3 py-1">
            <span className="text-sm font-semibold text-elnova-yellow">{currentPage + 1}</span>
            <span className="text-xs">/ {totalPages}</span>
          </div>
        )}
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Price Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Price</label>
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-elnova-yellow focus:ring-1 focus:ring-elnova-yellow"
          >
            <option value="all">All Prices</option>
            <option value="low-to-high">Lowest to Highest</option>
            <option value="high-to-low">Highest to Lowest</option>
          </select>
        </div>

        {/* Size Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold uppercase tracking-wider text-white/70">Size</label>
          <select
            value={sizeFilter}
            onChange={(e) => setSizeFilter(e.target.value)}
            className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-elnova-yellow focus:ring-1 focus:ring-elnova-yellow"
          >
            <option value="all">All Sizes</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-3 pb-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={`category-skeleton-${index}`} layout="grid" />
          ))}
        </div>
      ) : error ? (
        <p className="rounded-2xl bg-red-500/10 p-4 text-sm font-medium text-red-200 shadow-md">
          {error}
        </p>
      ) : filteredProducts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-white/60 bg-[#3a1d60] rounded-3xl ring-1 ring-white/10 shadow-lg mt-4">
          <p>No products currently found in this category.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div 
             className="grid grid-cols-2 gap-3 pb-2 transition-opacity duration-300"
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
          >
            {paginatedProducts.map((product) => (
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
          
          {totalPages > 1 && (
             <div className="flex items-center justify-center gap-4 pt-4 border-t border-white/10">
               <button
                 disabled={currentPage === 0}
                 onClick={() => setCurrentPage(p => p - 1)}
                 className={`p-2 rounded-full backdrop-blur-md shadow-md transition-colors ${currentPage === 0 ? 'bg-white/5 text-white/20' : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'}`}
               >
                 <ChevronLeft size={24} />
               </button>
               
               <div className="flex gap-1.5">
                  {Array.from({ length: totalPages }).map((_, idx) => (
                     <div 
                       key={idx} 
                       className={`h-2 rounded-full transition-all ${idx === currentPage ? 'w-6 bg-elnova-yellow' : 'w-2 bg-white/20'}`} 
                     />
                  ))}
               </div>

               <button
                 disabled={currentPage === totalPages - 1}
                 onClick={() => setCurrentPage(p => p + 1)}
                 className={`p-2 rounded-full backdrop-blur-md shadow-md transition-colors ${currentPage === totalPages - 1 ? 'bg-white/5 text-white/20' : 'bg-white/10 text-white hover:bg-white/20 active:scale-95'}`}
               >
                 <ChevronRight size={24} />
               </button>
             </div>
          )}
        </div>
      )}
    </section>
  )
}
