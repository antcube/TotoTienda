import { Menu, Heart, Search } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import SearchSidebar from './SearchSidebar';
import logo from '../assets/ZapaTopLogoV2.jpg';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { favoritesCount } = useFavorites();
  
  // Obtener el parámetro de género de la URL
  const searchParams = new URLSearchParams(location.search);
  const activeGender = searchParams.get('gender');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1 lg:py-3">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0 flex items-center cursor-pointer h-full py-2" onClick={() => navigate('/')}>
            <img 
              src={logo} 
              alt="ZapaTop" 
              className="h-16 lg:h-20 w-auto object-contain mix-blend-multiply"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12">
            <button 
              onClick={() => navigate('/?gender=Hombre')}
              className={`font-medium text-lg transition ${
                activeGender === 'Hombre' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Hombre
            </button>
            <button 
              onClick={() => navigate('/?gender=Mujer')}
              className={`font-medium text-lg transition ${
                activeGender === 'Mujer' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Mujer
            </button>
            <button 
              onClick={() => navigate('/?gender=Ni%C3%B1os')}
              className={`font-medium text-lg transition ${
                activeGender === 'Niños' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Niños
            </button>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Mobile */}
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
            >
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
            <button 
              onClick={() => { navigate('/?gender=Hombre'); setIsMenuOpen(false); }}
              className={`block py-2 font-medium text-lg w-full text-left ${
                activeGender === 'Hombre'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Hombre
            </button>
            <button 
              onClick={() => { navigate('/?gender=Mujer'); setIsMenuOpen(false); }}
              className={`block py-2 font-medium text-lg w-full text-left ${
                activeGender === 'Mujer'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Mujer
            </button>
            <button 
              onClick={() => { navigate('/?gender=Ni%C3%B1os'); setIsMenuOpen(false); }}
              className={`block py-2 font-medium text-lg w-full text-left ${
                activeGender === 'Niños'
                  ? 'text-blue-600'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Niños
            </button>
          </div>
        </div>
      )}

      {/* Search Sidebar */}
      <SearchSidebar 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)}
        currentGender={activeGender || undefined}
      />
    </nav>
  );
}
