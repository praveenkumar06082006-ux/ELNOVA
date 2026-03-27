import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'

function App() {
  const location = useLocation()

  // Check for direct access/refresh to category pages and redirect to home
  useEffect(() => {
    const categoryPaths = ['/offers', '/embroidery', '/sublimation']
    
    // Only redirect if it's not a navigation click (check for navigation type)
    if (categoryPaths.includes(location.pathname)) {
      // Check if this is a refresh/direct access, not navigation
      const navigationEntries = performance.getEntriesByType('navigation')
      const lastNavigation = navigationEntries[navigationEntries.length - 1]
      
      // If it's a refresh or direct URL access, redirect to home
      if (lastNavigation && (lastNavigation.type === 'reload' || lastNavigation.loadTransfer === 'reload')) {
        window.location.href = '/'
      }
    }
  }, [location.pathname])

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/offers" element={<CategoryPage category="offers" />} />
        <Route
          path="/embroidery"
          element={<CategoryPage category="embroidery" />}
        />
        <Route
          path="/sublimation"
          element={<CategoryPage category="sublimation" />}
        />
      </Route>
    </Routes>
  )
}

export default App
