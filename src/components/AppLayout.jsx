import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FavoritesDrawer } from './FavoritesDrawer'
import { ProductCard } from './ProductCard'
import { useProducts } from '../hooks/useProducts'
import { useAnalytics } from '../hooks/useAnalytics'

export const AppLayout = () => {
  const { products, loading, error } = useProducts()
  const { trackWhatsAppClick } = useAnalytics()
  const [favoriteIds, setFavoriteIds] = useState([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
  const [selectedFavoriteProduct, setSelectedFavoriteProduct] = useState(null)

  const favorites = useMemo(
    () => products.filter((item) => favoriteIds.includes(item.id)),
    [products, favoriteIds],
  )

  const toggleFavorite = (id) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    )
  }

  return (
    <div className="min-h-screen w-full bg-elnova-purple shadow-xl">
      <Header
        favoritesCount={favoriteIds.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />
      <main className="space-y-6">
        <Outlet
          context={{
            products,
            loading,
            error,
            favoriteIds,
            toggleFavorite,
            trackWhatsAppClick,
          }}
        />
      </main>
      <Footer />
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={favorites}
        onClose={() => setIsFavoritesOpen(false)}
        onSelect={(product) => {
          setSelectedFavoriteProduct(product)
          setIsFavoritesOpen(false) // optionally close drawer when opening product
        }}
      />
      {selectedFavoriteProduct && (
        <div className="fixed inset-0 z-[60]">
          <ProductCard
            product={selectedFavoriteProduct}
            isFavorite={favoriteIds.includes(selectedFavoriteProduct.id)}
            onToggleFavorite={toggleFavorite}
            initiallyExpanded={true}
            onClose={() => setSelectedFavoriteProduct(null)}
            trackWhatsAppClick={trackWhatsAppClick}
          />
        </div>
      )}
    </div>
  )
}
