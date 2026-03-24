import { useMemo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { FavoritesDrawer } from './FavoritesDrawer'
import { useProducts } from '../hooks/useProducts'

export const AppLayout = () => {
  const { products, loading, error } = useProducts()
  const [favoriteIds, setFavoriteIds] = useState([])
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)

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
    <div className="mx-auto min-h-screen w-full max-w-[480px] bg-white shadow-xl">
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
          }}
        />
      </main>
      <Footer />
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        favorites={favorites}
        onClose={() => setIsFavoritesOpen(false)}
      />
    </div>
  )
}
