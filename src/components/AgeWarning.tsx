import { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

export const AgeWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const hasConfirmed = localStorage.getItem('age-confirmed');
    if (!hasConfirmed) setShowWarning(true);
  }, []);

  const handleConfirm = () => {
    localStorage.setItem('age-confirmed', 'true');
    setShowWarning(false);
  };

  const handleDecline = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!showWarning) return null;

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-950 border border-neutral-800 rounded-3xl max-w-md w-full p-10 text-center animate-scale-in">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-neutral-900 rounded-2xl flex items-center justify-center border border-neutral-800">
            <Shield className="w-10 h-10 text-white" />
          </div>
        </div>

        <h2 className="font-display text-3xl font-bold mb-3 text-white">Verificacion de Edad</h2>
        <div className="divider-dark mx-auto mb-6" />

        <p className="text-neutral-400 mb-6 leading-relaxed">
          Este sitio web contiene productos derivados del cannabis legal destinados exclusivamente a mayores de 18 años.
        </p>

        <p className="text-white mb-8 font-bold text-lg">
          Eres mayor de 18 años?
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 btn-primary text-base"
          >
            Si, soy mayor
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-neutral-700"
          >
            No
          </button>
        </div>

        <p className="text-xs text-neutral-600 mt-6 tracking-wide">
          Cannabis legal en Espana. Uso responsable para adultos.
        </p>
      </div>
    </div>
  );
};
