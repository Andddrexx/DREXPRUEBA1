import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface WhatsAppConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  initialQuantity?: number;
}

export const WhatsAppConsultModal = ({ isOpen, onClose, productName = '' }: WhatsAppConsultModalProps) => {
  const [product, setProduct] = useState(productName);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setProduct(productName);
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

    const whatsappText = `NUEVA CONSULTA\nProducto: ${product.trim()}\nNombre: ${name.trim()}${message.trim() ? `\nMensaje: ${message.trim()}` : ''}`;
    const encoded = encodeURIComponent(whatsappText);
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
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] md:flex md:items-center md:justify-center md:p-4"
      onClick={onClose}
    >
      <div
        className="
          fixed inset-0 overflow-y-auto bg-neutral-800 shadow-2xl shadow-black/50
          md:relative md:inset-auto md:rounded-3xl md:max-w-md md:w-full md:max-h-[90vh] md:overflow-y-auto
          md:border md:border-neutral-600/50 md:animate-scale-in
          animate-fade-in
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 border-b border-neutral-600/50 sticky top-0 bg-neutral-800/95 backdrop-blur-md z-10">
          <h3 className="font-display text-lg font-bold text-white">Consulta por WhatsApp</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-neutral-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5 pb-10">
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
              placeholder="Tengo una duda sobre el sabor, recomendacion, disponibilidad..."
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
              Confirmo ser mayor de 18 anos
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
