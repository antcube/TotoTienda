import { MessageCircle, Heart, Sparkles } from 'lucide-react';

export default function Hero() {
  const handleWhatsAppClick = () => {
    const message = 'Hola! Quiero conocer más sobre sus productos 😊';
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '51958018646';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToProducts = () => {
    window.scrollTo({
      top: 600,
      behavior: 'smooth'
    });
  };
  return (
    <div className="relative bg-linear-to-r from-sky-400 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block bg-indigo-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
              <span className="text-sm font-semibold text-white">🎉 Nuevo - Chosica</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Zapatillas Originales
              <br />
              <span className="text-yellow-400">Adidas - Puma</span>
            </h1>

            <p className="text-lg lg:text-2xl font-bold text-white/90 max-w-md">
              BEBÉS - NIÑOS - MUJERES - HOMBRES
            </p>

            <p className="text-lg lg:text-xl text-white/90 max-w-md">
              Explora nuestro catálogo de zapatillas 100% originales, seleccionadas para ofrecer comodidad, estilo y calidad.
              Somos un emprendimiento en crecimiento con stock limitado y atención personalizada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleWhatsAppClick}
                className="bg-green-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="whitespace-nowrap">Consultar por WhatsApp</span>
              </button>
              <button 
                onClick={scrollToProducts}
                className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-white/10 transition text-sm sm:text-base w-full sm:w-auto"
              >
                Ver catálogo
              </button>
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:gap-8 gap-4 pt-4 justify-items-center sm:justify-items-start">
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                  <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 shrink-0" />
                  Atención
                </p>
                <p className="text-white/80 text-sm sm:text-base">Directo por Whatsapp</p>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold flex items-center gap-1 sm:gap-2 justify-center sm:justify-start">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-400 shrink-0" />
                  100%
                </p>
                <p className="text-white/80 text-sm sm:text-base">Dedicación</p>
              </div>
              <div className="col-span-2 sm:col-span-1 text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-bold">Chosica</p>
                <p className="text-white/80 text-sm sm:text-base">Lima, Perú</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-3xl"></div>
            <img
              src="https://images.puma.com/image/upload/f_auto,q_auto,e_sharpen:95,w_2000,h_2000/global/392328/53/sv04/fnd/PER/fmt/png/Zapatillas-Rebound-V6-Low-unisex"
              alt="Featured Sneaker"
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl transform hover:scale-105 transition duration-500"
              style={{ filter: 'drop-shadow(0 30px 60px rgba(59, 130, 246, 0.5))' }}
            />
          </div>
        </div>
      </div>

      {/* Wave Bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
