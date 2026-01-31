import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
    return (
        <FavoritesProvider>
            <Router>
                <div className="min-h-screen bg-white">
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/favorites" element={<Favorites />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </FavoritesProvider>
    )
}

export default App
