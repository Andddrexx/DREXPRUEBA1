import { useState } from 'react';
import { Info, X } from 'lucide-react';

export const IntensityInfo = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="mb-8">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="section-heading">
            Nuestros Vapers
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white bg-neutral-700 hover:bg-neutral-600 px-3 py-1.5 rounded-full transition-all duration-200 border border-neutral-600/50"
          >
            <Info size={14} />
            Sobre la intensidad
          </button>
        </div>
        <p className="text-neutral-400 mt-2 text-lg">
          Maxima <span className="text-red-500 font-semibold">intensidad</span> con 97% 10-OH-HHC
        </p>
        <div className="divider-dark mt-4" />
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setShowModal(false)}>
          <div
            className="bg-neutral-800 border border-neutral-600/50 shadow-2xl shadow-black/50 rounded-3xl max-w-md w-full max-h-96 overflow-y-auto animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-6 border-b border-neutral-600/50 sticky top-0 bg-neutral-800/95 backdrop-blur-md rounded-t-3xl">
              <h3 className="font-display text-lg font-bold text-white">Sobre la Intensidad</h3>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-neutral-400" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-neutral-400 leading-relaxed">
                La intensidad indicada es orientativa y se refiere a la percepcion general del producto (sabor, sensacion y efecto esperado).
              </p>

              <p className="text-neutral-400 leading-relaxed">
                Un vaper con menor intensidad <strong className="text-white">no implica ausencia de efecto</strong>, sino una experiencia mas suave y progresiva.
              </p>

              <p className="text-neutral-300 font-medium">
                La reaccion puede variar segun:
              </p>
              <ul className="space-y-2 text-neutral-400">
                {['La persona y su tolerancia', 'La experiencia previa', 'El uso responsable del producto', 'Factores personales de sensibilidad'].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="bg-neutral-700/60 border border-neutral-600/40 rounded-2xl p-4 mt-4">
                <p className="text-sm text-neutral-400">
                  <strong className="text-white">Nota:</strong> Recomendamos comenzar con intensidades mas bajas y aumentar segun tu preferencia y experiencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
