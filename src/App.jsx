import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { SearchPage } from './pages/SearchPage'
import { AppLoading } from './components/AppLoading'
import { useState, useEffect } from 'react'

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsAppLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {isAppLoading && <AppLoading />}
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
          <Route
            path="/cricket"
            element={<CategoryPage category="cricket" />}
          />
          <Route path="/search" element={<SearchPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
