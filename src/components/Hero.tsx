import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-sm font-semibold">Nueva Colección 2026</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Impulsa tu
              <br />
              <span className="text-yellow-300">rendimiento</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white/90 max-w-md">
              Descubre las zapatillas diseñadas para llevarte más lejos. 
              Tecnología, estilo y comodidad en cada paso.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition flex items-center justify-center group">
                Comprar ahora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition">
                Ver colección
              </button>
            </div>
            
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold">500+</p>
                <p className="text-white/80">Modelos</p>
              </div>
              <div>
                <p className="text-3xl font-bold">50K+</p>
                <p className="text-white/80">Clientes</p>
              </div>
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-white/80">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-pink-500/20 rounded-full blur-3xl"></div>
            <img
              src="https://images.puma.com/image/upload/f_auto,q_auto,e_sharpen:95,w_2000,h_2000/global/392328/53/sv04/fnd/PER/fmt/png/Zapatillas-Rebound-V6-Low-unisex"
              alt="Featured Sneaker"
              className="relative w-full max-w-lg mx-auto drop-shadow-2xl transform hover:scale-105 transition duration-500"
              style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3))' }}
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
