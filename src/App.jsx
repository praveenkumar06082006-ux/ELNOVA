import { Route, Routes, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'

function App() {
  const location = useLocation()

  // Check for direct access to category pages and redirect to home
  useEffect(() => {
    const categoryPaths = ['/offers', '/embroidery', '/sublimation']
    if (categoryPaths.includes(location.pathname)) {
      // Force redirect to home page
      window.location.href = '/'
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
