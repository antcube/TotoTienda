import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer from './components/Footer';

function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <Hero />
            <ProductGrid />
            <Footer />
        </div>
    )
}

export default App
