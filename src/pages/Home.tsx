import { useSearchParams, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import ProductsSkeleton from '../components/ProductsSkeleton';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../lib/products';

export default function Home() {
  const [searchParams] = useSearchParams();
  const genderFilter = searchParams.get('gender') || undefined;
  const searchQuery = searchParams.get('search') || undefined;
  const navigate = useNavigate();
  const { products, isLoading, error } = useProducts();

  // Si hay búsqueda, mostrar resultados (con o sin filtro de género)
  if (searchQuery) {
    return (
      <>
        <Hero />
        <ProductGrid searchQuery={searchQuery} genderFilter={genderFilter} />
      </>
    );
  }

  // Si hay filtro de género, mostrar la vista filtrada completa
  if (genderFilter) {
    return (
      <>
        <Hero />
        <ProductGrid genderFilter={genderFilter} />
      </>
    );
  }

  // Vista principal: Secciones separadas por género
  if (isLoading) {
    return (
      <>
        <Hero />
        <ProductsSkeleton />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Hero />
        <div className="bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 py-16 text-center">
            <p className="text-lg text-gray-600">No pudimos cargar los productos.</p>
            <p className="text-sm text-gray-400 mt-2">{error}</p>
          </div>
        </div>
      </>
    );
  }

  const hombreProducts = products
    .filter((p) => (p.gender === 'Hombre' || p.gender === 'Unisex') && p.isFeatured && p.available !== false)
    .slice(0, 8);

  const mujerProducts = products
    .filter((p) => (p.gender === 'Mujer' || p.gender === 'Unisex') && p.isFeatured && p.available !== false)
    .slice(0, 8);

  const ninosProducts = products
    .filter((p) => p.gender === 'Niños' && p.isFeatured && p.available !== false)
    .slice(0, 8);

  const GenderSection = ({ 
    title, 
    products, 
    gender 
  }: { 
    title: string; 
    products: Product[]; 
    gender: string;
  }) => (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Desktop */}
        <div className="hidden md:flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-2">Descubre nuestra selección destacada</p>
          </div>
          <button
            onClick={() => navigate(`/?gender=${gender}`)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Ver todos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Section Header - Mobile */}
        <div className="md:hidden mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1 text-sm">Descubre nuestra selección destacada</p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
          {/* Mostrar 2 productos adicionales solo en desktop */}
          <div className="hidden lg:block">
            {products[6] && <ProductCard {...products[6]} />}
          </div>
          <div className="hidden lg:block">
            {products[7] && <ProductCard {...products[7]} />}
          </div>
        </div>

        {/* Button - Mobile (below products) */}
        <div className="md:hidden mt-8 text-center">
          <button
            onClick={() => navigate(`/?gender=${gender}`)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Ver todos
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );

  return (
    <>
      <Hero />
      
      <div className="bg-gray-50">
        {/* Sección Hombre */}
        {hombreProducts.length > 0 && (
          <GenderSection 
            title="Destacados para Hombre" 
            products={hombreProducts} 
            gender="Hombre" 
          />
        )}

        {/* Separador */}
        {mujerProducts.length > 0 && <div className="border-t border-gray-200" />}

        {/* Sección Mujer */}
        {mujerProducts.length > 0 && (
          <GenderSection 
            title="Destacados para Mujer" 
            products={mujerProducts} 
            gender="Mujer" 
          />
        )}

        {/* Separador */}
        {ninosProducts.length > 0 && <div className="border-t border-gray-200" />}

        {/* Sección Niños */}
        {ninosProducts.length > 0 && (
          <GenderSection 
            title="Destacados para Niños" 
            products={ninosProducts} 
            gender="Niños" 
          />
        )}
      </div>
    </>
  );
}
