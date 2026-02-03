import { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export const AgeWarning = () => {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const hasConfirmed = localStorage.getItem('age-confirmed');
    if (!hasConfirmed) {
      setShowWarning(true);
    }
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
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-4">
          <AlertTriangle className="w-16 h-16 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold mb-4">Verificación de Edad</h2>
        <p className="text-gray-700 mb-6">
          Este sitio web contiene productos derivados del cannabis legal destinados exclusivamente a mayores de 18 años.
        </p>
        <p className="text-gray-700 mb-6 font-semibold">
          ¿Eres mayor de 18 años?
        </p>
        <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition"
          >
            Sí, soy mayor de 18
          </button>
          <button
            onClick={handleDecline}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition"
          >
            No
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Cannabis legal en España. Uso responsable para adultos.
        </p>
      </div>
    </div>
  );
};
