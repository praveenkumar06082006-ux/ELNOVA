import { Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { HomePage } from './pages/HomePage'
import { CategoryPage } from './pages/CategoryPage'
import { NotFoundPage } from './pages/NotFoundPage'

function App() {
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
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
