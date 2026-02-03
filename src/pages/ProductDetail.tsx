import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Truck, Shield, RotateCcw, Ruler } from 'lucide-react';
import { useState } from 'react';
import products from '../data/products.json';
import SizeGuideModal from '../components/SizeGuideModal';
import type { SizeCategory } from '../data/sizeguides';
import { useFavorites } from '../context/FavoritesContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  const product = products.find((p) => p.id.toString() === id);
  const isProductFavorite = product ? isFavorite(product.id) : false;

  const handleFavoriteClick = () => {
    if (product) {
      toggleFavorite(product.id);
    }
  };

  const handleWhatsAppConsult = () => {
    if (product) {
      let message = `Hola! Me interesa este producto:\n\n*${product.name}*\nPrecio: S/ ${product.price.toFixed(2)}`;
      if (selectedSize) {
        message += `\nTalla: ${selectedSize} US`;
      }
      message += '\n\n¿Está disponible?';
      
      const encodedMessage = encodeURIComponent(message);
      const phoneNumber = '51958018646'; // Número principal
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  // Determinar la categoría de talla basándose en el nombre del producto
  // Determina si las tallas son peruanas (PE) o estadounidenses (US)
  const isPeruvianSizing = (): boolean => {
    if (!product || product.sizes.length === 0) return false;
    // Las tallas peruanas son típicamente >= 30 (ej: 35, 36, 37, 38, 39, 40)
    // Las tallas US son típicamente < 20 (ej: 5.5, 6, 7, 8, 9, 10)
    return product.sizes.some(size => size >= 30);
  };

  // Determinar la categoría de talla basándose en el nombre del producto
  const getSizeCategory = (): SizeCategory => {
    if (!product) return 'all';
    
    // Check gender field first
    if (product.gender === 'Unisex') {
      return 'unisex';
    }
    if (product.gender === 'Hombre') {
      return 'men';
    }
    if (product.gender === 'Mujer') {
      return 'women';
    }
    if (product.gender === 'Niño' || product.gender === 'Niña') {
      return 'kids';
    }
    
    const name = product.name.toLowerCase();
    if (name.includes('unisex')) {
      return 'unisex';
    }
    if (name.includes('niño') || name.includes('niña') || name.includes('infantil') || name.includes('bebé')) {
      return 'kids';
    }
    if (name.includes('mujer') || name.includes('dama')) {
      return 'women';
    }
    if (name.includes('hombre') || name.includes('caballero')) {
      return 'men';
    }
    return 'all';
  };

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
        category={getSizeCategory()}
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
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                {!product.available && (
                  <span className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    AGOTADO
                  </span>
                )}
                {product.isNew && product.available && (
                  <span className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                    NUEVO
                  </span>
                )}
              </div>
              <img
                src={product.images[currentImageIndex]}
                alt={`${product.name} - imagen ${currentImageIndex + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  !product.available ? 'opacity-70' : ''
                }`}
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
              {!isPeruvianSizing() && (
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
              )}
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
              {product.available && (
                <button
                  onClick={handleWhatsAppConsult}
                  className="w-full text-white py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-6 h-6" />
                  {selectedSize ? `Consultar disponibilidad (Talla ${selectedSize})` : 'Consultar por WhatsApp'}
                </button>
              )}
              {!product.available && (
                <div className="w-full bg-gray-100 text-gray-500 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 cursor-not-allowed">
                  <MessageCircle className="w-6 h-6" />
                  Producto agotado
                </div>
              )}
              {product.available && (
                <button className={`
                  w-full py-4 rounded-xl font-bold text-lg border-2 transition-all flex items-center justify-center gap-3
                  ${isProductFavorite 
                    ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'border-gray-300 text-gray-900 hover:bg-gray-50'
                  }
                `}
                onClick={handleFavoriteClick}
                >
                  <Heart className={`w-6 h-6 ${isProductFavorite ? 'fill-red-600' : ''}`} />
                  {isProductFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                </button>
              )}
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

