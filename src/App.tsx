import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { Main } from './components/dashboard/Main'
import { CreateListingPage } from './pages/CreateListingPage'
import { ListingDetailPage } from './pages/ListingDetailPage'
import { ListingAssetsPage } from './pages/ListingAssetsPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/listing/create" element={<CreateListingPage />} />
          <Route path="/listing/:uuid/assets" element={<ListingAssetsPage />} />
          <Route path="/listing/:uuid" element={<ListingDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
