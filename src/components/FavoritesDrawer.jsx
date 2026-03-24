import { X } from 'lucide-react'

export const FavoritesDrawer = ({ isOpen, favorites, onClose }) => {
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
        className={`absolute right-0 top-0 h-full w-[92%] max-w-[360px] bg-white p-4 shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-heading text-xl text-elnova-purple">Favorites</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3">
          {favorites.length === 0 ? (
            <p className="rounded-2xl bg-gray-50 p-3 text-sm text-gray-500">
              No favorite products yet.
            </p>
          ) : (
            favorites.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 p-2"
              >
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-elnova-purple">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">{item.category}</p>
                  <p className="text-sm font-medium">₹{item.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  )
}
