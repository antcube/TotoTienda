import { X } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  brand: 'Puma' | 'Adidas';
}

// Datos de tallas para Puma
const pumaSizes = {
  men: [
    { us: '4', eu: '36', cm: '22' },
    { us: '4.5', eu: '36.5', cm: '22.5' },
    { us: '5', eu: '37', cm: '23' },
    { us: '5.5', eu: '37.5', cm: '23.5' },
    { us: '6', eu: '38', cm: '24' },
    { us: '6.5', eu: '38.5', cm: '24.5' },
    { us: '7', eu: '39', cm: '25' },
    { us: '7.5', eu: '40', cm: '25.5' },
    { us: '8', eu: '40.5', cm: '26' },
    { us: '8.5', eu: '41', cm: '26.5' },
    { us: '9', eu: '42', cm: '27' },
    { us: '9.5', eu: '42.5', cm: '27.5' },
    { us: '10', eu: '43', cm: '28' },
    { us: '10.5', eu: '44', cm: '28.5' },
    { us: '11', eu: '44.5', cm: '29' },
    { us: '11.5', eu: '45', cm: '29.5' },
    { us: '12', eu: '46', cm: '30' },
    { us: '12.5', eu: '46.5', cm: '30.5' },
    { us: '13', eu: '47', cm: '31' },
    { us: '14', eu: '48.5', cm: '31.5' },
    { us: '15', eu: '49.5', cm: '32' },
    { us: '16', eu: '51', cm: '32.5' },
    { us: '17', eu: '51.5', cm: '33' },
    { us: '18', eu: '52', cm: '33.5' },
  ]
};

// Datos de tallas para Adidas
const adidasSizes = {
  men: [
    { us: '4', eu: '36', cm: '22.1' },
    { us: '4.5', eu: '36 2/3', cm: '22.5' },
    { us: '5', eu: '37 1/3', cm: '22.9' },
    { us: '5.5', eu: '38', cm: '23.3' },
    { us: '6', eu: '38 2/3', cm: '23.8' },
    { us: '6.5', eu: '39 1/3', cm: '24.2' },
    { us: '7', eu: '40', cm: '24.6' },
    { us: '7.5', eu: '40 2/3', cm: '25' },
    { us: '8', eu: '41 1/3', cm: '25.5' },
    { us: '8.5', eu: '42', cm: '25.9' },
    { us: '9', eu: '42 2/3', cm: '26.3' },
    { us: '9.5', eu: '43 1/3', cm: '26.7' },
    { us: '10', eu: '44', cm: '27.1' },
    { us: '10.5', eu: '44 2/3', cm: '27.6' },
    { us: '11', eu: '45 1/3', cm: '28' },
    { us: '11.5', eu: '46', cm: '28.4' },
    { us: '12', eu: '46 2/3', cm: '28.8' },
    { us: '12.5', eu: '47 1/3', cm: '29.3' },
    { us: '13', eu: '48', cm: '29.7' },
    { us: '13.5', eu: '48 2/3', cm: '30.1' },
    { us: '14', eu: '49 1/3', cm: '30.5' },
    { us: '14.5', eu: '50', cm: '31' },
    { us: '15', eu: '50 2/3', cm: '31.4' },
    { us: '16', eu: '51 1/3', cm: '31.8' },
    { us: '17', eu: '52 2/3', cm: '32.6' },
    { us: '18', eu: '53 1/3', cm: '33.5' },
    { us: '19', eu: '54 2/3', cm: '34.3' },
    { us: '20', eu: '55 2/3', cm: '35.2' },
  ],
  women: [
    { us: '5', eu: '36', cm: '22.1' },
    { us: '5.5', eu: '36 2/3', cm: '22.5' },
    { us: '6', eu: '37 1/3', cm: '22.9' },
    { us: '6.5', eu: '38', cm: '23.3' },
    { us: '7', eu: '38 2/3', cm: '23.8' },
    { us: '7.5', eu: '39 1/3', cm: '24.2' },
    { us: '8', eu: '40', cm: '24.6' },
    { us: '8.5', eu: '40 2/3', cm: '25' },
    { us: '9', eu: '41 1/3', cm: '25.5' },
    { us: '9.5', eu: '42', cm: '25.9' },
    { us: '10', eu: '42 2/3', cm: '26.3' },
    { us: '10.5', eu: '43 1/3', cm: '26.7' },
    { us: '11', eu: '44', cm: '27.1' },
    { us: '11.5', eu: '44 2/3', cm: '27.6' },
    { us: '12', eu: '45 1/3', cm: '28' },
    { us: '12.5', eu: '46', cm: '28.4' },
    { us: '13', eu: '46 2/3', cm: '28.8' },
    { us: '13.5', eu: '47 1/3', cm: '29.3' },
    { us: '14', eu: '48', cm: '29.7' },
    { us: '14.5', eu: '48 2/3', cm: '30.1' },
    { us: '15', eu: '49 1/3', cm: '30.5' },
    { us: '15.5', eu: '50', cm: '31' },
  ]
};

export default function SizeGuideModal({ isOpen, onClose, brand }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const sizeData = brand === 'Puma' ? pumaSizes : adidasSizes;

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
          {/* Hombres */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hombres</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-3 py-2 text-center font-semibold">US</th>
                    <th className="border border-gray-300 px-3 py-2 text-center font-semibold">EUR</th>
                    <th className="border border-gray-300 px-3 py-2 text-center font-semibold">CM</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeData.men.map((size, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{size.us}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{size.eu}</td>
                      <td className="border border-gray-300 px-3 py-2 text-center">{size.cm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mujeres - Solo para Adidas */}
          {brand === 'Adidas' && (
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Mujeres</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">US</th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">EUR</th>
                      <th className="border border-gray-300 px-3 py-2 text-center font-semibold">CM</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeData.women?.map((size, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-3 py-2 text-center font-semibold">{size.us}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{size.eu}</td>
                        <td className="border border-gray-300 px-3 py-2 text-center">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
        </div>
      </div>
    </div>
  );
}
