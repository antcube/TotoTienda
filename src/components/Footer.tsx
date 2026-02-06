import { Facebook, Instagram, MessageCircle, MapPin, Phone, Mail, Heart, Clock } from 'lucide-react';
import logo from '../assets/ZapaTopLogoV2.jpg';

export default function Footer() {
  const handleWhatsAppClick = () => {
    const message = 'Hola! Me gustaría obtener más información sobre sus productos 😊';
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '51958018646';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="bg-white rounded-lg inline-block mb-4 px-6">
              <img 
                src={logo} 
                alt="ZapaTop" 
                className="h-32 w-32 object-contain"
              />
            </div>
            <p className="text-sm mb-6 leading-relaxed">
              Tu catálogo de confianza para las mejores zapatillas deportivas.
              Calidad, comodidad y estilo en cada modelo.
            </p>
            
            {/* WhatsApp CTA */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 mb-4"
            >
              <MessageCircle className="w-5 h-5" />
              Chatea con nosotros
            </button>

            <div className="flex gap-3">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Catálogo</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition flex items-center gap-2">
                  <span>Todos los Productos</span>
                </a>
              </li>
              <li>
                <a href="/favorites" className="hover:text-white transition flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span>Mis Favoritos</span>
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Zapatillas Deportivas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Zapatillas Casual
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Novedades
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Información</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition">
                  ¿Cómo comprar?
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Envíos y Entregas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Guía de Tallas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Preguntas Frecuentes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cambios y Devoluciones
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 shrink-0 text-blue-500" />
                <span className="text-sm">Chosica, Lima, Perú</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 shrink-0 text-blue-500" />
                <a href="tel:+51958018646" className="text-sm hover:text-white transition">
                  +51 958 018 646
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 shrink-0 text-blue-500" />
                <a href="mailto:info@zapatop.com" className="text-sm hover:text-white transition">
                  info@zapatop.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 shrink-0 text-blue-500" />
                <div className="text-sm">
                  <p>Lun - Sáb: 9:00 AM - 8:00 PM</p>
                  <p>Dom: 10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © 2026 ZapaTop. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Aceptamos:</span>
              <div className="flex gap-2">
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-semibold">Efectivo</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-semibold">Transferencia</div>
                <div className="bg-gray-800 px-3 py-1 rounded text-xs font-semibold">Yape</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
