import { X } from 'lucide-react'

export const FavoritesDrawer = ({ isOpen, favorites, onClose, onSelect }) => {
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
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className="flex items-center gap-3 rounded-2xl border border-gray-100 p-2 cursor-pointer hover:bg-gray-50 transition"
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

        {favorites.length > 0 && (
          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={() => {
                let text = "I would like to order the following items from my favorites:\n\n"
                favorites.forEach((product, i) => {
                  const firstImage = product.images?.[0] ? `\nImage: ${product.images[0]}` : ''
                  const descText = product["short description"] || product.description || ''
                  const desc = descText ? `\nDescription: ${descText}` : ''
                  text += `${i + 1}. Product: ${product.name}\nPrice: ₹${product.price}${firstImage}${desc}\n\n`
                })
                text += "Please let me know the required details (Name, Size, Quantity) to proceed."
                window.open(`https://wa.me/+919626291742?text=${encodeURIComponent(text)}`, '_blank')
              }}
              className="w-full rounded-xl bg-elnova-yellow py-3.5 text-center text-sm font-bold uppercase tracking-wide text-black shadow-md transition-transform hover:scale-[1.02] active:scale-95"
            >
              Order All Favorites via WhatsApp
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
