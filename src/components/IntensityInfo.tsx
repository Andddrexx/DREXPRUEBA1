import { useState } from 'react';
import { Info, X } from 'lucide-react';

export const IntensityInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Nuestros Vapers</h2>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center w-6 h-6 rounded-full border-2 border-gray-400 text-gray-600 hover:border-blue-500 hover:text-blue-500 transition"
          title="Información sobre intensidad"
        >
          <Info size={16} />
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white">
              <h3 className="text-lg font-bold text-gray-800">Sobre la Intensidad</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                La intensidad indicada es orientativa y se refiere a la percepción general del producto (sabor, sensación y efecto esperado).
              </p>

              <p className="text-gray-700">
                Un vaper con menor intensidad <strong>no implica ausencia de efecto</strong>, sino una experiencia más suave y progresiva.
              </p>

              <p className="text-gray-700">
                La reacción puede variar según:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>La persona y su tolerancia</li>
                <li>La experiencia previa</li>
                <li>El uso responsable del producto</li>
                <li>Factores personales de sensibilidad</li>
              </ul>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> Recomendamos comenzar con intensidades más bajas y aumentar según tu preferencia y experiencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
