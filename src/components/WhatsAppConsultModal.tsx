import { useState, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { products as productsData } from '../data/products';
import { formatProductName } from '../lib/whatsappMessages';

const productOptions = productsData
  .filter(p => p.category === '10-OH-HHC')
  .map(p => ({ value: formatProductName(p.name), label: formatProductName(p.name) }));

interface WhatsAppConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  initialQuantity?: number;
}

export const WhatsAppConsultModal = ({ isOpen, onClose, productName = '' }: WhatsAppConsultModalProps) => {
  const [product, setProduct] = useState(productName ? formatProductName(productName) : '');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProduct(productName ? formatProductName(productName) : '');
      setName('');
      setMessage('');
      setAgeConfirmed(false);
      setError('');
    }
  }, [isOpen, productName]);

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

    const consultText = `NUEVA CONSULTA\nProducto: ${product.trim()}\nNombre: ${name.trim()}${message.trim() ? `\nMensaje: ${message.trim()}` : ''}`;

    const encoded = encodeURIComponent(consultText);
    window.open(`https://wa.me/34681872420?text=${encoded}`, '_blank');

    setProduct('');
    setName('');
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
          <h3 className="font-display text-lg font-bold text-white">Consúltanos por WhatsApp</h3>
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
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={`input-field ${!product ? 'text-neutral-500' : 'text-neutral-200'}`}
            >
              <option value="">
                {product
                  ? productOptions.some((o) => o.value === product)
                    ? '— Selecciona un producto —'
                    : product
                  : '— Selecciona un producto —'}
              </option>
              {productOptions.map((option) => (
                <option key={option.value} value={option.value} className="text-neutral-200">
                  {option.label}
                </option>
              ))}
            </select>
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
              Mensaje (opcional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="input-field resize-none"
              placeholder="Tengo una duda sobre el sabor, recomendación, disponibilidad…"
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
            <MessageCircle className="w-5 h-5" />
            Enviar por WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};
