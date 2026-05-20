import { useEffect, useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';

interface CartToastProps {
  visible: boolean;
  productName: string;
}

export const CartToast = ({ visible, productName }: CartToastProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (visible) {
      setShow(true);
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!show) return null;

  const shortName = productName.replace(/Vape Pen Desechable 10-OH-HHC\s*/i, '').replace(/\s*1ml\s*–\s*Rollz/i, '').trim();

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] pointer-events-none animate-fade-in-up">
      <div className="flex items-center gap-3 bg-neutral-800 border border-neutral-600/60 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-black/50 backdrop-blur-md min-w-[260px] max-w-[90vw]">
        <div className="w-8 h-8 bg-emerald-900/50 border border-emerald-700/50 rounded-xl flex items-center justify-center flex-shrink-0">
          <Check className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Añadido al pedido</p>
          <p className="text-sm text-neutral-300 truncate">{shortName || 'Producto añadido'}</p>
        </div>
        <ShoppingCart className="w-4 h-4 text-neutral-500 flex-shrink-0 ml-auto" />
      </div>
    </div>
  );
};
