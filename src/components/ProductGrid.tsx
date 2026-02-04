import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ProductCard from './ProductCard';
import productsData from '../data/products.json';
import { SlidersHorizontal, X, Loader2 } from 'lucide-react';

interface Product {
  id: number | string;
  name: string;
  category: string;
  gender: string;
  price: number;
  image: string;
  images: string[];
  brand: string;
  sizes: number[];
  isNew?: boolean;
  isFeatured?: boolean;
  available?: boolean;
  description: string;
}

interface ProductGridProps {
  genderFilter?: string;
}

export default function ProductGrid({ genderFilter }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [displayedCount, setDisplayedCount] = useState<number>(12);
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Cambiar categorías según el género seleccionado
  const categories = genderFilter === 'Niños' 
    ? ['Todos', 'Deportivas', 'Urbanas']
    : ['Todos', 'Deportivas', 'Outdoor', 'Urbanas'];

  // Filter by gender first
  // Products with gender "Unisex" should appear in both Hombre and Mujer categories (not in Niños)
  let filteredProducts: Product[] = genderFilter
    ? productsData.filter((p) => {
        if (p.gender === genderFilter) return true;
        // Unisex products only appear in Hombre and Mujer, not in Niños
        if (p.gender === 'Unisex' && (genderFilter === 'Hombre' || genderFilter === 'Mujer')) return true;
        return false;
      })
    : productsData;

  // Then filter by category
  filteredProducts = selectedCategory === 'Todos'
    ? filteredProducts
    : filteredProducts.filter((p) => p.category === selectedCategory);

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    // Primero: disponibles antes que agotados
    const aAvailable = a.available !== false;
    const bAvailable = b.available !== false;
    if (aAvailable && !bAvailable) return -1;
    if (!aAvailable && bAvailable) return 1;
    
    // Luego aplicar el ordenamiento seleccionado
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    // Default: featured first, then new
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    return 0;
  });

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(12);
  }, [genderFilter, selectedCategory, sortBy]);

  // Load more products when scroll trigger is in view
  useEffect(() => {
    if (inView && displayedCount < filteredProducts.length) {
      // Simulate loading delay for better UX
      const timer = setTimeout(() => {
        setDisplayedCount((prev) => Math.min(prev + 12, filteredProducts.length));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [inView, displayedCount, filteredProducts.length]);

  const displayedProducts = filteredProducts.slice(0, displayedCount);
  const hasMore = displayedCount < filteredProducts.length;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {genderFilter ? `Calzado para ${genderFilter}` : 'Nuestra Colección'}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Encuentra las zapatillas perfectas para tu estilo y actividad
          </p>
          {genderFilter && (
            <button
              onClick={() => navigate('/')}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full font-medium transition"
            >
              <X className="w-4 h-4" />
              Ver todos los productos
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3">
            <SlidersHorizontal className="w-5 h-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2.5 font-medium text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            >
              <option value="featured">Destacados</option>
              <option value="price-low">Precio: Bajo a Alto</option>
              <option value="price-high">Precio: Alto a Bajo</option>
              <option value="name">Nombre A-Z</option>
            </select>
          </div>
        </div>

        {/* Products Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold">{displayedCount}</span> de{' '}
            <span className="font-semibold">{filteredProducts.length}</span> productos
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {/* Loading indicator and scroll trigger */}
        {hasMore && (
          <div ref={ref} className="flex justify-center items-center py-12">
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg font-medium">Cargando más productos...</span>
            </div>
          </div>
        )}

        {/* End message */}
        {!hasMore && filteredProducts.length > 12 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Has visto todos los productos disponibles</p>
          </div>
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No se encontraron productos en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
