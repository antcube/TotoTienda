import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';

// WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

interface ProductCardProps {
  id: number | string;
  name: string;
  category: string;
  price: number;
  image: string;
  isNew?: boolean;
  available?: boolean;
  brand?: string;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  isNew,
  available = true,
  brand,
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
      id={`product-${id}`}
      onClick={() => navigate(`/product/${id}`)}
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Labels */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10 flex flex-col gap-1 sm:gap-2">
        {!available && (
          <span className="bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
            AGOTADO
          </span>
        )}
        {isNew && available && (
          <span className="bg-blue-600 text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md">
            NUEVO
          </span>
        )}
      </div>

      {/* Brand Badge */}
      {brand && (
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10">
          <span className={`text-white text-[10px] sm:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md ${
            brand === 'Adidas' ? 'bg-black' : brand === 'Puma' ? 'bg-gray-800' : 'bg-gray-600'
          }`}>
            {brand.toUpperCase()}
          </span>
        </div>
      )}

      {/* Favorite Button */}
      {available && (
        <button 
          onClick={handleFavoriteClick}
          className={`absolute ${brand ? 'top-10 sm:top-14' : 'top-2 sm:top-4'} right-2 sm:right-4 z-10 p-1.5 sm:p-2 bg-white rounded-full shadow-md transition-all hover:scale-110 ${
            isProductFavorite ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
        >
          <Heart 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
              isProductFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
            }`} 
          />
        </button>
      )}

      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${
            !available ? 'opacity-60 grayscale-[30%]' : ''
          }`}
        />
        
        {/* WhatsApp Button */}
        {available && (
          <button 
            onClick={handleWhatsAppClick}
            className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 text-white px-3 sm:px-6 py-1.5 sm:py-2.5 text-xs sm:text-sm rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1 sm:gap-2 translate-y-4 group-hover:translate-y-0 bg-green-600 hover:bg-green-700"
          >
            <WhatsAppIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Consultar por WhatsApp</span>
            <span className="sm:hidden">Consultar</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <p className="text-[10px] sm:text-sm text-gray-500 uppercase tracking-wide mb-1">{category}</p>
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 mb-2 sm:mb-3 line-clamp-2">{name}</h3>

        {/* Price */}
        <div className="mt-2">
          <span className="text-xl sm:text-2xl font-bold text-gray-900">S/ {price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
