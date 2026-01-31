import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Truck, Shield, RotateCcw, Ruler } from 'lucide-react';
import { useState } from 'react';
import products from '../data/products.json';
import SizeGuideModal from '../components/SizeGuideModal';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Size Guide Modal */}
      <SizeGuideModal 
        isOpen={showSizeGuide} 
        onClose={() => setShowSizeGuide(false)}
        brand={product.brand as 'Puma' | 'Adidas'}
      />

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver a la tienda</span>
          </button>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section with Carousel */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg aspect-square">
              {product.isNew && (
                <span className="absolute top-6 left-6 z-10 bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                  NUEVO
                </span>
              )}
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-6 right-6 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`
                    relative aspect-square rounded-lg overflow-hidden bg-white transition-all
                    ${currentImageIndex === index 
                      ? 'ring-4 ring-blue-600 shadow-lg' 
                      : 'hover:ring-2 hover:ring-gray-300'
                    }
                  `}
                >
                  <img
                    src={image}
                    alt={`${product.name} - miniatura ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-gray-200 py-6">
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-gray-900">
                  S/ {product.price.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Selecciona tu talla (US)
                </h3>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition"
                >
                  <Ruler className="w-4 h-4" />
                  Guía de tallas
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
                      py-3 px-3 rounded-lg border-2 font-semibold transition-all text-center
                      ${
                        selectedSize === size
                          ? 'border-blue-600 bg-blue-50 text-blue-600'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                disabled={!selectedSize}
                className={`
                  w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all
                  ${
                    selectedSize
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
              >
                <ShoppingCart className="w-6 h-6" />
                {selectedSize ? 'Añadir al carrito' : 'Selecciona una talla'}
              </button>
              <button className="w-full py-4 rounded-xl font-bold text-lg border-2 border-gray-300 text-gray-900 hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <Heart className="w-6 h-6" />
                Añadir a favoritos
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Envío gratis</h4>
                  <p className="text-sm text-gray-600">En compras mayores a S/ 150</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <RotateCcw className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Devoluciones fáciles</h4>
                  <p className="text-sm text-gray-600">30 días para cambios y devoluciones</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Garantía de calidad</h4>
                  <p className="text-sm text-gray-600">Productos 100% auténticos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

