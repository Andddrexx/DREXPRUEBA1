import { useState, useEffect } from 'react';
import { Product, Promotion, PromoColor } from '../types';
import { X, Minus, Plus, ShoppingCart, MessageCircle, TrendingDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { promotions as promotionsData } from '../data/products';
import { WhatsAppConsultModal } from './WhatsAppConsultModal';

const promoColorStyles: Record<PromoColor, { bg: string; border: string; icon: string; text: string; savingsBg: string; savingsBorder: string; savingsText: string }> = {
  orange: { bg: 'bg-amber-900/20', border: 'border-amber-800/30', icon: 'text-amber-500', text: 'text-amber-400', savingsBg: 'bg-amber-900/40', savingsBorder: 'border-amber-700/50', savingsText: 'text-amber-400' },
  pink: { bg: 'bg-pink-900/20', border: 'border-pink-500/30', icon: 'text-pink-400', text: 'text-pink-300', savingsBg: 'bg-pink-900/40', savingsBorder: 'border-pink-500/50', savingsText: 'text-pink-300' },
  green: { bg: 'bg-lime-900/25', border: 'border-lime-400/40', icon: 'text-lime-300', text: 'text-lime-200', savingsBg: 'bg-lime-900/40', savingsBorder: 'border-lime-400/50', savingsText: 'text-lime-300' },
  purple: { bg: 'bg-purple-900/20', border: 'border-purple-500/30', icon: 'text-purple-400', text: 'text-purple-300', savingsBg: 'bg-purple-900/40', savingsBorder: 'border-purple-500/50', savingsText: 'text-purple-300' },
};

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [promotions] = useState<Promotion[]>(promotionsData);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [savings, setSavings] = useState(0);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    calculatePrice();
  }, [quantity, promotions]);

  const calculatePrice = () => {
    let finalPrice = product.price * quantity;
    let totalSavings = 0;
    for (const promo of promotions) {
      if (quantity >= promo.quantity && promo.discount_amount) {
        totalSavings = promo.discount_amount;
        finalPrice = product.price * quantity - totalSavings;
      }
    }
    setTotalPrice(finalPrice);
    setSavings(totalSavings);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <>
      <WhatsAppConsultModal
        isOpen={showWhatsAppModal}
        onClose={() => setShowWhatsAppModal(false)}
        productName={product.name}
        initialQuantity={quantity}
      />
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 md:flex md:items-center md:justify-center md:p-4"
        onClick={onClose}
      >
        {/* Panel: full-screen on mobile, modal on desktop */}
        <div
          className="
            fixed inset-0 overflow-y-auto bg-neutral-800 shadow-2xl shadow-black/50
            md:relative md:inset-auto md:rounded-3xl md:max-w-4xl md:w-full md:max-h-[90vh] md:overflow-y-auto
            md:border md:border-neutral-600/50 md:animate-scale-in
            animate-fade-in
          "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-neutral-800/95 backdrop-blur-md border-b border-neutral-600/50 flex justify-between items-center p-5 md:rounded-t-3xl z-10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-400">
                {product.category === '10-OH-HHC' ? '10-OH-HHC' : product.category}
              </span>
              <h2 className="font-display text-xl font-bold text-white leading-snug">{product.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-neutral-700 hover:bg-neutral-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-neutral-300" />
            </button>
          </div>

          <div className="p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="relative rounded-2xl overflow-hidden bg-neutral-900">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-80 md:h-[396px] object-contain"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <p className="text-neutral-300 mb-6 leading-relaxed text-[15px]">{product.description}</p>

                <div className="space-y-4 mb-6">
                  {product.features && product.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1 h-full min-h-[40px] bg-white rounded-full flex-shrink-0" />
                      <div>
                        <p className="text-white font-medium">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-600/50 pt-6 mt-auto">
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-bold text-white tracking-tight">
                      {product.price.toFixed(2)}<span className="text-xl font-semibold text-neutral-400">€</span>
                    </span>
                    <span className="text-xs text-neutral-400">unidad</span>
                  </div>

                  <div className="space-y-2 mb-6">
                    {promotions.map((promo) => {
                      const color = promoColorStyles[product.promoColor || 'orange'];
                      return (
                        <div
                          key={promo.id}
                          className={`flex items-center gap-2 text-sm ${color.bg} border ${color.border} rounded-xl p-3`}
                        >
                          <TrendingDown className={`w-4 h-4 ${color.icon} flex-shrink-0`} />
                          <span className={`${color.text} font-medium`}>{promo.description}</span>
                        </div>
                      );
                    })}
                  </div>

                  {product.stock > 0 ? (
                    <>
                      <div className="flex items-center gap-4 mb-5">
                        <span className="text-sm font-medium text-neutral-400">Cantidad</span>
                        <div className="flex items-center gap-1 bg-neutral-700 rounded-xl p-1 border border-neutral-600/50">
                          <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-9 h-9 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-10 text-center font-bold text-white">{quantity}</span>
                          <button
                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                            className="w-9 h-9 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          onClick={() => setShowWhatsAppModal(true)}
                          className="flex items-center gap-2 bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2.5 rounded-xl transition-colors border border-neutral-600/50 text-sm font-medium"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Consultar
                        </button>
                      </div>

                      <div className="bg-neutral-700/60 rounded-2xl p-5 mb-5 border border-neutral-600/40">
                        <p className="text-xs text-neutral-400 mb-1">Total por {quantity} unidad{quantity !== 1 ? 'es' : ''}</p>
                        <div className="flex items-baseline gap-3">
                          <span className="text-4xl font-bold text-white tracking-tight">{totalPrice.toFixed(2)}€</span>
                          {savings > 0 && (
                            <span className={`badge ${promoColorStyles[product.promoColor || 'orange'].savingsBg} ${promoColorStyles[product.promoColor || 'orange'].savingsText} border ${promoColorStyles[product.promoColor || 'orange'].savingsBorder}`}>
                              Ahorras {savings.toFixed(2)}€
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full btn-primary flex items-center justify-center gap-2 mb-8 md:mb-0"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Anadir al carrito
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-neutral-700 text-neutral-400 py-3 px-6 rounded-xl font-semibold cursor-not-allowed border border-neutral-600/50"
                    >
                      Sin stock
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
