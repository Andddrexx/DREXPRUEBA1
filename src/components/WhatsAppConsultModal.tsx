import { useState, useEffect } from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface WhatsAppConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  initialQuantity?: number;
}

const deliveryOptions = [
  { value: '24-48h', label: '24-48h' },
  { value: 'esta-semana', label: 'Esta semana' },
];

export const WhatsAppConsultModal = ({ isOpen, onClose, productName = '', initialQuantity = 1 }: WhatsAppConsultModalProps) => {
  const [product, setProduct] = useState(productName);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(initialQuantity);
  const [delivery, setDelivery] = useState('24-48h');
  const [message, setMessage] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProduct(productName);
      setName('');
      setQuantity(initialQuantity);
      setDelivery('24-48h');
      setMessage('');
      setAgeConfirmed(false);
      setError('');
    }
  }, [isOpen, productName, initialQuantity]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!product.trim()) {
      setError('Indica el producto que te interesa');
      return;
    }

    if (!name.trim()) {
      setError('Indica tu nombre');
      return;
    }

    if (!ageConfirmed) {
      setError('Debes confirmar que eres mayor de 18 años');
      return;
    }

    const deliveryLabel = deliveryOptions.find(o => o.value === delivery)?.label || delivery;

    const whatsappText = `NUEVA CONSULTA\nProducto: ${product.trim()}\nCantidad: ${quantity}\nNombre: ${name.trim()}\nEntrega: ${deliveryLabel}\nMayor de edad: Si${message.trim() ? `\nMensaje: ${message.trim()}` : ''}`;
 
    const encoded = encodeURIComponent(whatsappText);
    window.open(`https://wa.me/34681872420?text=${encoded}`, '_blank');

    setProduct('');
    setName('');
    setQuantity(1);
    setDelivery('24-48h');
    setMessage('');
    setAgeConfirmed(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-[60]"
      onClick={onClose}
    >
      <div
        className="bg-neutral-800 border border-neutral-600/50 shadow-2xl shadow-black/50 rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-600/50">
          <h3 className="font-display text-lg font-bold text-white">Consulta por WhatsApp</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-neutral-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Producto *
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className="input-field"
              placeholder="Vape Pen MAC 1ml"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Cantidad
            </label>
            <div className="flex items-center gap-1 bg-neutral-700 rounded-xl p-1 border border-neutral-600/50 w-fit">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-bold text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Tu nombre *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              ¿Cuándo lo quieres?
            </label>
            <div className="flex gap-2">
              {deliveryOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setDelivery(option.value)}
                  className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    delivery === option.value
                      ? 'bg-white text-neutral-900 border-white'
                      : 'bg-neutral-700 text-neutral-400 border-neutral-600/50 hover:bg-neutral-600 hover:text-white'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">
              Mensaje adicional (opcional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="input-field resize-none"
              placeholder="Tengo una duda sobre el sabor..."
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(e) => setAgeConfirmed(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-neutral-600 bg-neutral-700 text-white accent-white cursor-pointer"
            />
            <span className="text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
              Confirmo ser mayor de 18 años
            </span>
          </label>

          {error && (
            <div className="bg-red-900/20 border border-red-800/30 rounded-xl p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full btn-primary flex items-center justify-center gap-2 py-4"
          >
            Enviar consulta por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
