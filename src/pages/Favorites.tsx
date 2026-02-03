import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, MessageCircle } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import products from '../data/products.json';
import ProductCard from '../components/ProductCard';

export default function Favorites() {
  const navigate = useNavigate();
  const { favorites, favoritesCount } = useFavorites();

  const favoriteProducts = products.filter((product) => favorites.includes(product.id));

  const handleSendFavoritesToWhatsApp = () => {
    let message = '❤️ *MI LISTA DE FAVORITOS - ZAPATOP*\n\n';
    message += 'Me interesan estos productos:\n\n';
    
    favoriteProducts.forEach((product, index) => {
      message += `${index + 1}. *${product.name}*\n`;
      message += `   💰 S/ ${product.price.toFixed(2)}\n\n`;
    });
    
    message += '¿Podrían darme más información sobre disponibilidad? 😊';
    
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '51958018646'; // Número principal
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (favoritesCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
            <Heart className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            No tienes favoritos aún
          </h2>
          <p className="text-gray-600 mb-8">
            Explora nuestra colección y guarda tus productos favoritos para encontrarlos fácilmente más tarde.
          </p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-bold hover:bg-gray-800 transition-all"
          >
            <ShoppingBag className="w-5 h-5" />
            Explorar productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <Heart className="w-10 h-10 text-red-500 fill-red-500" />
                <h1 className="text-4xl font-bold text-gray-900">Mis Favoritos</h1>
              </div>
              <p className="text-gray-600 text-lg">
                {favoritesCount} {favoritesCount === 1 ? 'producto guardado' : 'productos guardados'}
              </p>
            </div>
            <button
              onClick={handleSendFavoritesToWhatsApp}
              className="bg-green-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2 shrink-0"
            >
              <MessageCircle className="w-5 h-5" />
              Enviar lista por WhatsApp
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              category={product.category}
              price={product.price}
              image={product.image}
              isNew={product.isNew}
              brand={product.brand}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
