import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Download, ArrowLeft, Check, Eye, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../lib/products';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function AdminCatalog() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<Set<string | number>>(new Set());
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const navigate = useNavigate();
  const { products, isLoading } = useProducts({ includeUnavailable: true });
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'zapa2026top';
    if (password === adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert('Password incorrecto');
    }
  };

  const toggleProduct = (productId: string | number) => {
    const newSelected = new Set(selectedProducts);
    if (newSelected.has(productId)) {
      newSelected.delete(productId);
    } else {
      newSelected.add(productId);
    }
    setSelectedProducts(newSelected);
  };

  const generatePDF = async () => {
    if (selectedProducts.size === 0) {
      alert('Selecciona al menos un producto');
      return;
    }

    setIsGenerating(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const selectedProductsList = products.filter(p => selectedProducts.has(p.id));
      
      for (let i = 0; i < selectedProductsList.length; i++) {
        const product = selectedProductsList[i];
        
        // Create temporary container for this product
        const tempContainer = document.createElement('div');
        tempContainer.style.width = '210mm';
        tempContainer.style.height = '297mm';
        tempContainer.style.position = 'absolute';
        tempContainer.style.left = '-9999px';
        tempContainer.innerHTML = createProductCard(product);
        document.body.appendChild(tempContainer);

        // Wait for images to load
        await new Promise(resolve => setTimeout(resolve, 500));

        // Capture as image
        const canvas = await html2canvas(tempContainer, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
        });

        // Add to PDF
        if (i > 0) {
          pdf.addPage();
        }
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);

        // Clean up
        document.body.removeChild(tempContainer);
      }

      pdf.save(`catalogo-zapatop-${Date.now()}.pdf`);
    } catch (error) {
      console.error('Error generando PDF:', error);
      alert('Error al generar PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  const createProductCard = (product: Product): string => {
    const mainImage = product.images[0] || product.image;
    const thumbnails = product.images.slice(0, 3);
    
    return `
      <div style="
        width: 210mm;
        height: 297mm;
        background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
        box-sizing: border-box;
        position: relative;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      ">
        <!-- Header Bar -->
        <div style="
          background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
          padding: 30px 50px;
          color: white;
        ">
          <div style="
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            opacity: 0.9;
            margin-bottom: 5px;
          ">${product.brand}</div>
          <div style="
            font-size: 14px;
            opacity: 0.7;
            letter-spacing: 1px;
          ">${product.category} • ${product.gender}</div>
        </div>

        <!-- Main Content -->
        <div style="
          flex: 1;
          display: flex;
          padding: 50px;
          gap: 50px;
        ">
          <!-- Left Side: Image -->
          <div style="
            flex: 1.2;
            display: flex;
            flex-direction: column;
            gap: 20px;
          ">
            <!-- Main Image with subtle background -->
            <div style="
              flex: 1;
              background: white;
              border-radius: 20px;
              padding: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 10px 40px rgba(0,0,0,0.08);
              position: relative;
              overflow: hidden;
            ">
              <!-- Subtle gradient overlay -->
              <div style="
                position: absolute;
                inset: 0;
                background: radial-gradient(circle at 30% 30%, rgba(52, 152, 219, 0.03), transparent 60%);
              "></div>
              
              <img src="${mainImage}" style="
                width: 100%;
                height: 100%;
                object-fit: contain;
                position: relative;
                z-index: 1;
                filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
              " crossorigin="anonymous" />
            </div>

            <!-- Thumbnail Gallery -->
            <div style="
              display: flex;
              gap: 15px;
              height: 100px;
            ">
              ${thumbnails.map(img => `
                <div style="
                  flex: 1;
                  background: white;
                  border-radius: 12px;
                  padding: 15px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
                ">
                  <img src="${img}" style="
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                  " crossorigin="anonymous" />
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Right Side: Info -->
          <div style="
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          ">
            <!-- Product Name & Description -->
            <div>
              <h1 style="
                font-size: 42px;
                font-weight: 800;
                color: #2c3e50;
                margin: 0 0 20px 0;
                line-height: 1.2;
                letter-spacing: -0.5px;
              ">${product.name}</h1>
              
              <p style="
                font-size: 16px;
                color: #7f8c8d;
                line-height: 1.6;
                margin: 0 0 40px 0;
              ">${product.description || 'Calzado de alta calidad con diseño moderno y confort superior. Ideal para uso diario.'}</p>

              <!-- Features -->
              <div style="
                display: grid;
                gap: 15px;
                margin-bottom: 40px;
              ">
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 12px;
                ">
                  <div style="
                    width: 8px;
                    height: 8px;
                    background: #3498db;
                    border-radius: 50%;
                  "></div>
                  <span style="
                    font-size: 15px;
                    color: #34495e;
                  ">Diseño versátil y moderno</span>
                </div>
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 12px;
                ">
                  <div style="
                    width: 8px;
                    height: 8px;
                    background: #3498db;
                    border-radius: 50%;
                  "></div>
                  <span style="
                    font-size: 15px;
                    color: #34495e;
                  ">Máximo confort durante todo el día</span>
                </div>
                <div style="
                  display: flex;
                  align-items: center;
                  gap: 12px;
                ">
                  <div style="
                    width: 8px;
                    height: 8px;
                    background: #3498db;
                    border-radius: 50%;
                  "></div>
                  <span style="
                    font-size: 15px;
                    color: #34495e;
                  ">Materiales de primera calidad</span>
                </div>
              </div>
            </div>

            <!-- Price Section -->
            <div style="
              background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
              padding: 30px;
              border-radius: 16px;
              color: white;
              margin-bottom: 30px;
              box-shadow: 0 10px 30px rgba(52, 152, 219, 0.3);
            ">
              <div style="
                font-size: 16px;
                font-weight: 600;
                letter-spacing: 1px;
                text-transform: uppercase;
                opacity: 0.9;
                margin-bottom: 5px;
              ">Precio</div>
              <div style="
                font-size: 56px;
                font-weight: 900;
                letter-spacing: -2px;
              ">S/ ${product.price}</div>
            </div>

            <!-- Sizes -->
            <div>
              <div style="
                font-size: 16px;
                font-weight: 700;
                color: #2c3e50;
                margin-bottom: 15px;
                letter-spacing: 0.5px;
              ">TALLAS DISPONIBLES</div>
              
              <div style="
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
              ">
                ${product.sizes.map(size => `
                  <div style="
                    background: white;
                    border: 2px solid #ecf0f1;
                    padding: 12px 20px;
                    border-radius: 10px;
                    font-size: 16px;
                    font-weight: 700;
                    color: #2c3e50;
                    text-align: center;
                    min-width: 70px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                  ">US ${size}</div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div style="
          background: #2c3e50;
          padding: 20px 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: white;
        ">
          <div style="
            font-size: 13px;
            opacity: 0.7;
          ">ID: ${product.id}</div>
          <div style="
            font-size: 16px;
            font-weight: 600;
            letter-spacing: 2px;
          ">ZAPATOP</div>
          <div style="
            font-size: 13px;
            opacity: 0.7;
          ">WhatsApp: 958-018-646</div>
        </div>
      </div>
    `;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-6">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-center mb-2">Área Administrativa</h1>
          <p className="text-gray-600 text-center mb-6">Ingresa el password para acceder</p>
          
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-4"
              autoFocus
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Acceder
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden PDF container */}
      <div ref={pdfContainerRef} style={{ position: 'absolute', left: '-9999px' }} />

      {/* Preview Modal */}
      {showPreview && selectedProducts.size > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Vista Previa del Catálogo</h2>
                <p className="text-sm text-gray-600 mt-1">
                  Página {previewIndex + 1} de {selectedProducts.size}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={generatePDF}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  {isGenerating ? 'Generando...' : 'Descargar PDF'}
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-auto p-6">
              <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                <div 
                  className="bg-white shadow-2xl"
                  style={{ 
                    width: '210mm',
                    height: '297mm',
                    transform: 'scale(0.45)',
                    transformOrigin: 'top center',
                  }}
                  dangerouslySetInnerHTML={{ 
                    __html: createProductCard(
                      products.filter(p => selectedProducts.has(p.id))[previewIndex]
                    ) 
                  }}
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
              <button
                onClick={() => setPreviewIndex(Math.max(0, previewIndex - 1))}
                disabled={previewIndex === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Anterior
              </button>
              <span className="text-sm text-gray-600 font-medium">
                {products.filter(p => selectedProducts.has(p.id))[previewIndex]?.name}
              </span>
              <button
                onClick={() => setPreviewIndex(Math.min(selectedProducts.size - 1, previewIndex + 1))}
                disabled={previewIndex === selectedProducts.size - 1}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Siguiente
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Volver</span>
          </button>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {selectedProducts.size} producto{selectedProducts.size !== 1 ? 's' : ''} seleccionado{selectedProducts.size !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => {
                setPreviewIndex(0);
                setShowPreview(true);
              }}
              disabled={selectedProducts.size === 0}
              className="flex items-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Eye className="w-5 h-5" />
              Ver Vista Previa
            </button>
            <button
              onClick={generatePDF}
              disabled={selectedProducts.size === 0 || isGenerating}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {isGenerating ? 'Generando...' : 'Generar PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Catálogo</h1>
        <p className="text-gray-600 mb-8">Selecciona los productos que deseas incluir en el catálogo PDF</p>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Cargando productos...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((product) => {
              const isSelected = selectedProducts.has(product.id);
              return (
                <button
                  key={product.id}
                  onClick={() => toggleProduct(product.id)}
                  className={`
                    relative bg-white rounded-xl overflow-hidden shadow-sm border-2 transition-all text-left
                    ${isSelected ? 'border-blue-600 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                  `}
                >
                  {/* Checkbox indicator */}
                  {isSelected && (
                    <div className="absolute top-3 right-3 z-10 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}

                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase mb-1">{product.category}</p>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-lg font-bold text-gray-900">S/ {product.price}</p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
