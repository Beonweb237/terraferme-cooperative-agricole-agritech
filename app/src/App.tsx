import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import Farms from './pages/Farms'
import AgriTech from './pages/AgriTech'
import Sustainability from './pages/Sustainability'
import Cooperative from './pages/Cooperative'
import Recipes from './pages/Recipes'
import News from './pages/News'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/farms" element={<Farms />} />
        <Route path="/agritech" element={<AgriTech />} />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route path="/cooperative" element={<Cooperative />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/news" element={<News />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}
