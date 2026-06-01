import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatProductName } from '../lib/whatsappMessages';

export const CartToast = () => {
  const { toasts, dismissToast } = useCart();

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 pointer-events-none items-center w-full px-4">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} id={toast.id} productName={toast.productName} onDismiss={dismissToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  id: number;
  productName: string;
  onDismiss: (id: number) => void;
}

const ToastItem = ({ id, productName, onDismiss }: ToastItemProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    const hide = setTimeout(() => setVisible(false), 2600);
    return () => {
      cancelAnimationFrame(show);
      clearTimeout(hide);
    };
  }, []);

  const simplified = formatProductName(productName);

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 bg-neutral-800 border border-neutral-600/60 rounded-2xl shadow-2xl shadow-black/40 px-4 py-3.5 max-w-xs w-full transition-all duration-500 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="w-8 h-8 bg-emerald-900/40 border border-emerald-700/50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
        <CheckCircle className="w-4 h-4 text-emerald-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-semibold text-sm leading-snug">Añadido al carrito</p>
        <p className="text-neutral-400 text-xs mt-0.5 truncate">{simplified}</p>
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="w-6 h-6 flex items-center justify-center text-neutral-500 hover:text-white transition-colors flex-shrink-0 mt-0.5"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
