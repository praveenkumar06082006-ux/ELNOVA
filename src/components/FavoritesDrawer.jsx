import { X, Heart, Trash2 } from 'lucide-react'
import { useState } from 'react'

export const FavoritesDrawer = ({ isOpen, favorites, onClose, onSelect, onToggleFavorite }) => {
  const [expandedImage, setExpandedImage] = useState(null)
  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-[92%] max-w-[360px] flex-col bg-white p-4 shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl text-elnova-purple">Favorites</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {favorites.length === 0 ? (
            <p className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-500">
              No favorite products yet.
            </p>
          ) : (
            favorites.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className="relative flex-shrink-0">
                  <img
                    src={item.images?.[0] || 'https://placehold.co/80x80/3a1d60/ffffff?text=No+Image'}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover cursor-pointer hover:scale-105 transition-transform duration-200 shadow-sm"
                    onClick={() => setExpandedImage(item.images?.[0] || 'https://placehold.co/800x800/3a1d60/ffffff?text=No+Image')}
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate mb-1">{item.name}</h4>
                  <p className="text-xs text-gray-500 mb-2 capitalize">{Array.isArray(item.category) ? item.category[0] : item.category}</p>
                  <p className="text-lg font-bold text-elnova-purple">₹{item.price}</p>
                </div>
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className="flex-shrink-0 rounded-full p-2.5 text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 shadow-sm hover:shadow-md"
                  aria-label="Remove from favorites"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {favorites.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                let text = "Hello! I would like to order the following products from my favorites:\n\n"
                favorites.forEach((product, i) => {
                  const totalPrice = product.price // Default quantity of 1 for favorites
                  text += `${i + 1}. ${product.name}\n`
                  text += `   - Price: ₹${totalPrice}\n`
                  text += `   - I need this product\n\n`
                })
                text += "Please let me know the availability and delivery details for these items.\n\nThank you!"
                window.open(`https://wa.me/+919626291742?text=${encodeURIComponent(text)}`, '_blank')
              }}
              className="w-full rounded-xl bg-elnova-yellow py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black shadow-md transition-transform hover:scale-[1.02] active:scale-95"
            >
              Order All Favorites via WhatsApp
            </button>
          </div>
        )}
      </aside>

      {/* Image Expansion Modal */}
      {expandedImage && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4">
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute -top-12 right-0 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Close image"
            >
              <X size={24} />
            </button>
            
            <div className="relative">
              <img
                src={expandedImage}
                alt="Expanded product image"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
