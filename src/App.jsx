import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'

function App() {
  const location = useLocation()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  // Check for direct access to category pages (not through navigation)
  useEffect(() => {
    const categoryPaths = ['/offers', '/embroidery', '/sublimation']
    if (categoryPaths.includes(location.pathname) && !sessionStorage.getItem('navigated')) {
      setShouldRedirect(true)
    } else if (location.pathname === '/') {
      sessionStorage.removeItem('navigated')
    }
  }, [location.pathname])

  const handleNavigation = (path) => {
    sessionStorage.setItem('navigated', 'true')
    window.location.href = path
  }

  if (shouldRedirect) {
    return <Navigate to="/" replace />
  }

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
