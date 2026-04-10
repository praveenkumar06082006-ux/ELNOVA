import { useEffect } from 'react'

export const AppLoading = () => {
  useEffect(() => {
    // Prevent white flash during Firebase initialization
    document.body.style.backgroundColor = '#1a1a2d' // Match ELNOVA purple background
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a2d]">
      <div className="text-white text-xl font-semibold animate-pulse">
        Loading ELNOVA...
      </div>
    </div>
  )
}
