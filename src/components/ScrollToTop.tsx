import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    // Si es la página de detalle del producto, siempre scroll al inicio
    if (location.pathname.includes('/product/')) {
      window.scrollTo(0, 0);
      return;
    }

    // Para otras páginas, intentar restaurar la posición guardada
    const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}${location.search}`);
    
    if (savedPosition) {
      // Restaurar posición después de que el contenido se haya renderizado
      // Usar requestAnimationFrame para esperar al siguiente frame
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo(0, parseInt(savedPosition));
          sessionStorage.removeItem(`scroll-${location.pathname}${location.search}`);
        }, 200);
      });
    } else {
      window.scrollTo(0, 0);
    }

    // Guardar posición actual antes de navegar
    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.pathname}${location.search}`, window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, location.search]);

  return null;
}
