import { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import productsData from '../data/products.json';

interface SearchSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentGender?: string;
}

export default function SearchSidebar({ isOpen, onClose, currentGender }: SearchSidebarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof productsData>([]);
  const navigate = useNavigate();

  // Buscar productos en tiempo real
  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      let results = productsData.filter((p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );

      // Filtrar por género si existe
      if (currentGender) {
        results = results.filter((p) => {
          if (p.gender === currentGender) return true;
          // Unisex products only appear in Hombre and Mujer, not in Niños
          if (p.gender === 'Unisex' && (currentGender === 'Hombre' || currentGender === 'Mujer')) return true;
          return false;
        });
      }

      setSearchResults(results.slice(0, 8)); // Mostrar solo los primeros 8 resultados
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, currentGender]);

  const handleProductClick = (id: number | string) => {
    navigate(`/product/${id}`);
    onClose();
    setSearchQuery('');
  };

  const handleViewAll = () => {
    if (searchQuery.trim()) {
      // Navegar al ProductGrid con búsqueda, manteniendo el género si existe
      const params = new URLSearchParams();
      params.set('search', searchQuery.trim());
      if (currentGender) {
        params.set('gender', currentGender);
      }
      navigate(`/?${params.toString()}`);
      onClose();
      setSearchQuery('');
    }
  };

  // Limpiar búsqueda al cerrar
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [isOpen]);

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-50 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Buscar productos</h2>
            {currentGender && (
              <p className="text-xs text-gray-500 mt-0.5">en {currentGender}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4">
          <div className="flex items-center bg-gray-100 rounded-lg px-4 py-3">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Buscar zapatillas..."
              className="flex-1 bg-transparent outline-none text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 hover:bg-gray-200 rounded-full transition"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="overflow-y-auto h-[calc(100vh-140px)] px-4">
          {searchQuery && searchResults.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-600">
                  {searchResults.length === 8 ? 'Más de 8' : searchResults.length} resultado{searchResults.length !== 1 ? 's' : ''}
                </p>
                {searchResults.length === 8 && (
                  <button
                    onClick={handleViewAll}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
                  >
                    Ver todos
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {searchResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition text-left"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">{product.brand}</p>
                      <p className="text-sm font-bold text-gray-900">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {searchQuery && searchResults.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No se encontraron resultados</p>
              <p className="text-sm text-gray-400 mt-1">
                Intenta con otros términos
              </p>
            </div>
          )}

          {!searchQuery && (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                {currentGender ? `Busca zapatillas de ${currentGender}` : 'Busca zapatillas por nombre,'}
              </p>
              <p className="text-sm text-gray-400">
                {currentGender ? 'por nombre, marca o categoría' : 'marca o categoría'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
