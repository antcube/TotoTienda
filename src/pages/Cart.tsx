import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalItems, subtotal, shipping, total } = useCart();

  const generateWhatsAppMessage = () => {
    // Generar mensaje de WhatsApp con los detalles del pedido
    let message = '🛍️ *NUEVA ORDEN - TIENDA TOTO*\n\n';
    message += '*Productos:*\n';
    
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   📏 Talla: ${item.size} US\n`;
      message += `   📦 Cantidad: ${item.quantity}\n`;
      message += `   💰 Precio: S/ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += '━━━━━━━━━━━━━━━━━━\n';
    message += `*Subtotal:* S/ ${subtotal.toFixed(2)}\n`;
    message += `*Envío:* ${shipping === 0 ? 'GRATIS 🎉' : `S/ ${shipping.toFixed(2)}`}\n`;
    message += `*TOTAL:* S/ ${total.toFixed(2)}\n\n`;
    message += '¿Deseas confirmar esta orden? 😊';
    
    return message;
  };

  const handleSendToWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const encodedMessage = encodeURIComponent(message);
    
    // Números de WhatsApp (reemplaza con tus números)
    const phoneNumbers = [
      '51958018646',  // Número 1
      '51957748377',  // Número 2
    ];
    
    // Abrir WhatsApp para cada número
    phoneNumbers.forEach((phoneNumber, index) => {
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, index * 500); // Delay de 500ms entre cada ventana para evitar bloqueo del navegador
    });
  };

  if (totalItems === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8">
            Explora nuestra colección y encuentra las zapatillas perfectas para ti.
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
          <div className="flex items-center gap-4 mb-3">
            <ShoppingBag className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">Carrito de Compras</h1>
          </div>
          <p className="text-gray-600 text-lg">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="shrink-0">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-gray-600">
                          Talla: <span className="font-semibold">{item.size} US</span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-2 border-2 border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          S/ {(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            S/ {item.price.toFixed(2)} c/u
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Resumen del pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</span>
                  <span className="font-semibold">S/ {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-green-600">GRATIS</span>
                    ) : (
                      `S/ ${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                {shipping > 0 && subtotal < 150 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800">
                      Agrega <span className="font-bold">S/ {(150 - subtotal).toFixed(2)}</span> más para 
                      obtener <span className="font-bold">envío gratis</span>
                    </p>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xl font-bold text-gray-900">Total</span>
                    <span className="text-3xl font-bold text-gray-900">
                      S/ {total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleSendToWhatsApp}
                className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Enviar orden por WhatsApp
              </button>

              <button
                onClick={() => navigate('/')}
                className="w-full border-2 border-gray-300 text-gray-900 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Continuar comprando
              </button>

              {/* Benefits */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>Envío gratis en compras mayores a S/ 150</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>30 días para cambios y devoluciones</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5" />
                  <span>Productos 100% auténticos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
