import { useState, useEffect } from 'react'
import { Search, X } from 'lucide-react'

export const SearchBar = ({ onSearch, placeholder = "Search products..." }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 300) // Debounce search after 300ms

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  const handleClear = () => {
    setSearchTerm('')
    onSearch('')
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-white/60" />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full rounded-full bg-white/10 border border-white/20 py-3 pl-10 pr-10 text-white placeholder:text-white/50 outline-none focus:border-elnova-yellow focus:ring-2 focus:ring-elnova-yellow/20 transition-all duration-200"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-white/60 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Search suggestions dropdown (can be extended later) */}
      {isFocused && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-2 rounded-xl bg-white/95 backdrop-blur-md shadow-xl border border-white/20 overflow-hidden z-50">
          <div className="p-4 text-center text-gray-600">
            <p className="text-sm">Searching for "{searchTerm}"...</p>
          </div>
        </div>
      )}
    </div>
  )
}
