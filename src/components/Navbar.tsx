import { Search, Menu, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <h1 className="text-2xl font-bold text-gray-900">
              TIENDA<span className="text-blue-600">TOTO</span>
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Hombre
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Mujer
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Niños
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Ofertas
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Novedades
            </a>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2">
              <Search className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="bg-transparent outline-none text-sm w-48"
              />
            </div>

            {/* Search Icon for mobile */}
            <button className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition">
              <Search className="w-6 h-6 text-gray-700" />
            </button>

            {/* Favorites Icon */}
            <button 
              onClick={() => navigate('/favorites')}
              className="relative p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Heart className="w-6 h-6 text-gray-700" />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Hombre
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Mujer
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Niños
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Ofertas
            </a>
            <a href="#" className="block py-2 text-gray-700 hover:text-blue-600 font-medium">
              Novedades
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
