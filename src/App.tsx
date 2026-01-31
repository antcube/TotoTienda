import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import { FavoritesProvider } from './context/FavoritesContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
    return (
        <ToastProvider>
            <CartProvider>
                <FavoritesProvider>
                    <Router>
                        <div className="min-h-screen bg-white">
                            <Navbar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/product/:id" element={<ProductDetail />} />
                                <Route path="/favorites" element={<Favorites />} />
                                <Route path="/cart" element={<Cart />} />
                            </Routes>
                            <Footer />
                        </div>
                    </Router>
                </FavoritesProvider>
            </CartProvider>
        </ToastProvider>
    )
}

export default App
