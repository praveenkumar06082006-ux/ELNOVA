import { useState } from 'react'
import { Heart, Menu, X, ChevronDown } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navClass = ({ isActive }) =>
  `block rounded-xl px-3 py-2 text-sm font-medium ${
    isActive ? 'bg-elnova-yellow text-black' : 'text-white'
  }`

export const Header = ({ favoritesCount, onOpenFavorites }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-elnova-purple">
      <div className="flex h-8 items-center justify-center border-b border-white/10 bg-elnova-purple px-4">
        <Link to="/offers" className="font-heading text-xs text-elnova-yellow hover:underline">
          OPENING OFFER (FREE SHIPPING)
        </Link>
      </div>

      <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
        <Link to="/" className="font-heading text-2xl font-bold text-white">
          ELNOVA
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFavorites}
            className="relative rounded-full p-2 text-white"
            aria-label="Open favorites"
          >
            <Heart size={18} />
            {favoritesCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 rounded-full bg-elnova-yellow px-1.5 text-[10px] font-semibold text-black">
                {favoritesCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-white"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="space-y-1 border-b border-white/10 bg-elnova-purple px-4 py-3">
          <NavLink to="/" className={navClass} onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <button
            type="button"
            onClick={() => setShopOpen((prev) => !prev)}
            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-medium text-white"
          >
            Shop
            <ChevronDown size={16} />
          </button>
          {shopOpen && (
            <div className="space-y-1 pl-3">
              <NavLink
                to="/offers"
                className={navClass}
                onClick={() => setMenuOpen(false)}
              >
                Offers
              </NavLink>
              <NavLink
                to="/embroidery"
                className={navClass}
                onClick={() => setMenuOpen(false)}
              >
                Embroidery
              </NavLink>
              <NavLink
                to="/sublimation"
                className={navClass}
                onClick={() => setMenuOpen(false)}
              >
                Sublimation
              </NavLink>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              onOpenFavorites()
              setMenuOpen(false)
            }}
            className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-white"
          >
            Favorites
          </button>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="block rounded-xl px-3 py-2 text-sm font-medium text-white"
          >
            About Us
          </a>
        </nav>
      )}
    </header>
  )
}
