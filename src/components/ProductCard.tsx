import { MessageCircle, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  isNew,
}: ProductCardProps) {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hola! Me interesa este producto:\n\n*${name}*\nPrecio: S/ ${price.toFixed(2)}\n\n¿Está disponible?`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '51958018646'; // Usa el número principal
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div 
      onClick={() => navigate(`/product/${id}`)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Labels */}
      {isNew && (
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            NUEVO
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button 
        onClick={handleFavoriteClick}
        className={`absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md transition-all hover:scale-110 ${
          isProductFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
      >
        <Heart 
          className={`w-5 h-5 transition-colors ${
            isProductFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
          }`} 
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* WhatsApp Button */}
        <button 
          onClick={handleWhatsAppClick}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-2.5 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-700 flex items-center gap-2 translate-y-4 group-hover:translate-y-0"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar por WhatsApp
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2">{name}</h3>

        {/* Price */}
        <div className="mt-2">
          <span className="text-2xl font-bold text-gray-900">S/ {price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
