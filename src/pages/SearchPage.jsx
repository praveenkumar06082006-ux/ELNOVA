import { useState, useMemo } from 'react'
import { useOutletContext } from 'react-router-dom'
import { SearchBar } from '../components/SearchBar'
import { SearchResults } from '../components/SearchResults'
import { ArrowLeft } from 'lucide-react'

export const SearchPage = () => {
  const { products, favoriteIds, toggleFavorite, trackWhatsAppClick } = useOutletContext()
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Filter products based on search term
  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return []
    
    const term = searchTerm.toLowerCase().trim()
    
    return products.filter((product) => {
      // Search in product name (primary)
      const nameMatch = product.name?.toLowerCase().includes(term)
      
      // Search in description (secondary)
      const descMatch = product.description?.toLowerCase().includes(term) || 
                      product["short description"]?.toLowerCase().includes(term)
      
      // Search in category (tertiary)
      const categoryMatch = Array.isArray(product.category) 
        ? product.category.some(cat => cat?.toLowerCase().includes(term))
        : product.category?.toLowerCase().includes(term)
      
      // Return true if any field matches
      return nameMatch || descMatch || categoryMatch
    })
  }, [products, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
    // Simulate loading for better UX
    if (term !== searchTerm) {
      setLoading(true)
      setTimeout(() => setLoading(false), 200)
    }
  }

  const handleClearSearch = () => {
    setSearchTerm('')
  }

  return (
    <section className="flex w-full flex-col px-4 pb-8 min-h-[70vh]">
      {/* Search Header */}
      <div className="flex items-center gap-4 mb-6 mt-4">
        <button
          onClick={() => window.history.back()}
          className="rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder="Search for products, brands, categories..."
          />
        </div>
      </div>

      {/* Search Results */}
      <SearchResults
        searchResults={searchResults}
        searchTerm={searchTerm}
        loading={loading}
        favoriteIds={favoriteIds}
        toggleFavorite={toggleFavorite}
        trackWhatsAppClick={trackWhatsAppClick}
        onClearSearch={handleClearSearch}
      />
    </section>
  )
}
