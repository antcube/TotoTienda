import { X } from 'lucide-react';
import { sizeGuides } from '../../data/sizeguides';
import type { Brand, SizeCategory } from '../../data/sizeguides';
import SizeTable from './SizeTable';

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: Brand;
  category?: SizeCategory;
}

export default function SizeGuideModal({ isOpen, onClose, brand, category = 'all' }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const sizeData = sizeGuides[brand];

  const showMen = category === 'all' || category === 'men';
  const showWomen = category === 'all' || category === 'women';
  const showKids = category === 'all' || category === 'kids';
  const showUnisex = category === 'all' || category === 'unisex';

  // Check if there's custom HTML content for kids or men (Adidas)
  const hasCustomKidsContent = showKids && sizeData.kidsHtmlContent && brand === 'Adidas';
  const hasCustomMenContent = showMen && sizeData.menHtmlContent && brand === 'Adidas';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">Guía de Tallas - {brand}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Custom HTML Content for Kids - Solo muestra este contenido cuando existe */}
          {hasCustomKidsContent ? (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sizeData.kidsHtmlContent || '' }}
            />
          ) : hasCustomMenContent ? (
            <div 
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: sizeData.menHtmlContent || '' }}
            />
          ) : (
            <>
              {/* Unisex */}
              {showUnisex && sizeData.unisex && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Calzado Unisex (Hombre/Mujer)</h3>
                  <SizeTable sizes={sizeData.unisex} />
                </div>
              )}

              {/* Hombres */}
              {showMen && sizeData.men && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Hombres</h3>
                  <SizeTable sizes={sizeData.men} />
                </div>
              )}

              {/* Mujeres */}
              {showWomen && sizeData.women && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Mujeres</h3>
                  <SizeTable sizes={sizeData.women} />
                </div>
              )}

              {/* Niños */}
              {showKids && sizeData.kids && Array.isArray(sizeData.kids) && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Zapatillas para niños</h3>
                  
                  {/* Bebé (0-4 años) */}
                  <SizeTable 
                    sizes={sizeData.kids.filter((size) => size.category === 'baby')}
                    title="Zapatillas para bebé (0-4 años)"
                  />
                  
                  {/* Niño (5-7 años) */}
                  <div className="mt-6">
                    <SizeTable 
                      sizes={sizeData.kids.filter((size) => size.category === 'child')}
                      title="Zapatillas para niño (5-7 años)"
                    />
                  </div>
                </div>
              )}

              {/* Instrucciones */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Cómo medir tu pie</h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  <li>Coloca tu pie sobre una hoja de papel</li>
                  <li>Marca el punto más largo de tu pie (talón y dedo más largo)</li>
                  <li>Mide la distancia en centímetros</li>
                  <li>Compara la medida con la columna CM en la tabla de arriba</li>
                  <li>Si estás entre dos tallas, te recomendamos elegir la talla mayor</li>
                </ol>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
