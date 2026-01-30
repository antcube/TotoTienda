import { ShoppingCart, Heart } from 'lucide-react';

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  colors: string[];
  isNew?: boolean;
}

export default function ProductCard({
  name,
  category,
  price,
  originalPrice,
  image,
  colors,
  isNew,
}: ProductCardProps) {
  const discount = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Labels */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {isNew && (
          <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
            NUEVO
          </span>
        )}
        {discount > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            -{discount}%
          </span>
        )}
      </div>

      {/* Favorite Button */}
      <button className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-100">
        <Heart className="w-5 h-5 text-gray-700" />
      </button>

      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick Add Button */}
        <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2.5 rounded-full font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-800 flex items-center gap-2 translate-y-4 group-hover:translate-y-0">
          <ShoppingCart className="w-4 h-4" />
          Añadir al carrito
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">{category}</p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{name}</h3>

        {/* Colors */}
        <div className="flex gap-2 mb-3">
          {colors.slice(0, 4).map((color, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:border-blue-600 transition"
              style={{
                backgroundColor:
                  color === 'Negro'
                    ? '#000'
                    : color === 'Blanco'
                    ? '#fff'
                    : color === 'Azul'
                    ? '#3b82f6'
                    : color === 'Rojo'
                    ? '#ef4444'
                    : color === 'Gris'
                    ? '#6b7280'
                    : color === 'Verde'
                    ? '#10b981'
                    : color === 'Amarillo'
                    ? '#fbbf24'
                    : color === 'Rosa'
                    ? '#ec4899'
                    : color === 'Turquesa'
                    ? '#14b8a6'
                    : color === 'Marrón'
                    ? '#92400e'
                    : color === 'Beige'
                    ? '#d6c9b5'
                    : '#000',
              }}
              title={color}
            />
          ))}
          {colors.length > 4 && (
            <span className="text-xs text-gray-500 self-center">+{colors.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-900">S/ {price}</span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">${originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
