import { useState, useEffect } from 'react';
import { useCart, DeliveryMethod, SHIPPING_BASE_COST, FREE_SHIPPING_MIN_ITEMS } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, Mail, ArrowLeft, Truck, Handshake, CheckCircle } from 'lucide-react';
import { generateOrderId, buildEmailPayload } from '../lib/whatsappMessages';

interface CartProps {
  onNavigate: (page: string) => void;
}

export const Cart = ({ onNavigate }: CartProps) => {
  const { cart, deliveryMethod, setDeliveryMethod, removeFromCart, updateQuantity, getTotalPrice, getDiscount, getFinalPrice, getShippingCost, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const totalPrice = getTotalPrice();
  const discount = getDiscount();
  const shippingCost = getShippingCost();
  const finalPrice = getFinalPrice();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const isFreeShipping = totalItems >= FREE_SHIPPING_MIN_ITEMS;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, '').slice(0, 9);
    setFormData({ ...formData, phone: value });
    if (phoneError && value.length === 9) setPhoneError('');
  };

  const validatePhone = () => {
    if (formData.phone.length !== 9) {
      setPhoneError('El teléfono debe tener exactamente 9 dígitos');
      return false;
    }
    return true;
  };

  const handleProceedToCheckout = () => {
    setShowCheckout(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone()) return;
    setLoading(true);

    try {
      const orderId = generateOrderId();
      const shippingAddress = deliveryMethod === 'shipping'
        ? `${formData.address}${formData.city ? `, ${formData.city}` : ''}${formData.postalCode ? ` ${formData.postalCode}` : ''}`
        : '';
      const notesWithAddress = shippingAddress
        ? `${shippingAddress}${formData.notes ? `\n${formData.notes}` : ''}`
        : formData.notes;

      const emailPayload = buildEmailPayload(orderId, formData.name, formData.email, formData.phone, cart, totalPrice, discount, shippingCost, finalPrice, notesWithAddress, deliveryMethod);

      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-order-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        const errorMsg = errorData?.error || `Error ${res.status}: ${res.statusText}`;
        console.error('Edge Function error:', res.status, errorData);
        throw new Error(errorMsg);
      }

      const result = await res.json();
      if (result.skipped) {
        console.warn('Email was skipped - SMTP credentials may not be configured');
      }

      clearCart();
      setFormData({ name: '', email: '', phone: '', address: '', city: '', postalCode: '', notes: '' });
      setOrderSuccess(true);
      window.scrollTo({ top: 0, behavior: 'instant' });

      setTimeout(() => {
        onNavigate('home');
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      const msg = error instanceof Error ? error.message : 'Error desconocido';
      alert(`Error al procesar el pedido: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 pt-28 pb-16 flex items-center justify-center">
        <div className="bg-neutral-800 border border-neutral-600/50 rounded-3xl p-10 max-w-md w-full mx-4 text-center animate-scale-in">
          <div className="w-20 h-20 bg-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-emerald-800/30">
            <CheckCircle className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="font-display text-3xl font-bold text-white mb-3">Pedido realizado</h2>
          <p className="text-neutral-400 leading-relaxed">
            Tu pedido ha sido registrado. Recibirás un email de confirmación y nos pondremos en contacto contigo pronto.
          </p>
          <p className="text-neutral-600 text-sm mt-5">Redirigiendo a inicio...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-500 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto text-center py-20">
            <div className="w-24 h-24 bg-neutral-800/80 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-neutral-600/50">
              <ShoppingBag className="w-12 h-12 text-neutral-600" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Tu carrito esta vacío</h2>
            <p className="text-neutral-500 mb-8">Añade productos para comenzar tu pedido</p>
          </div>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-500 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <button
              onClick={handleBackToCart}
              className="flex items-center gap-2 text-neutral-400 hover:text-white font-medium mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver al carrito
            </button>

            <h2 className="font-display text-4xl font-bold text-white mb-8">Finalizar Pedido</h2>

            <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-6 mb-6">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">Resumen del pedido</h3>
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between py-3 border-b border-neutral-800 last:border-b-0">
                  <span className="text-neutral-300 text-[15px]">
                    {item.product.name} <span className="text-neutral-600">x{item.quantity}</span>
                  </span>
                  <span className="font-semibold text-white">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-3 text-neutral-500 text-sm">
                <span>Subtotal</span>
                <span>{totalPrice.toFixed(2)}€</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between py-3 border-t border-neutral-800 text-emerald-400 font-semibold">
                  <span>Descuento ({cart.reduce((total, item) => total + item.quantity, 0)} items)</span>
                  <span>-{discount.toFixed(2)}€</span>
                </div>
              )}
              {shippingCost > 0 && (
                <div className="flex justify-between py-3 border-t border-neutral-800 text-neutral-400 text-sm">
                  <span>Envio</span>
                  <span>+{shippingCost.toFixed(2)}€</span>
                </div>
              )}
              <div className="flex justify-between py-4 font-bold text-lg border-t border-neutral-800">
                <span className="text-white">Total</span>
                <span className="text-white">{finalPrice.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-6 mb-6">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">Forma de entrega</h3>
              <div className="flex flex-col gap-3">
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('hand')}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    deliveryMethod === 'hand'
                      ? 'bg-white text-neutral-900 border-white'
                      : 'bg-neutral-700/50 text-neutral-400 border-neutral-600/50 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  <Handshake className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">Entrega en mano (Recogida)</p>
                    <p className={`text-xs font-bold mt-0.5 ${deliveryMethod === 'hand' ? 'text-emerald-600' : 'text-emerald-400'}`}>Gratis</p>
                    <p className="text-xs mt-1 text-neutral-500">Entrega hoy o en 24–48h (según disponibilidad y zona)</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryMethod('shipping')}
                  className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${
                    deliveryMethod === 'shipping'
                      ? 'bg-white text-neutral-900 border-white'
                      : 'bg-neutral-700/50 text-neutral-400 border-neutral-600/50 hover:bg-neutral-700 hover:text-white'
                  }`}
                >
                  <Truck className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold leading-snug">Envío</p>
                    <p className={`text-xs font-bold mt-0.5 ${deliveryMethod === 'shipping' ? (isFreeShipping ? 'text-emerald-600' : 'text-neutral-600') : isFreeShipping ? 'text-emerald-400' : 'text-neutral-300'}`}>
                      {isFreeShipping ? 'Gratis (desde 2 vapers)' : `3,99 € (gratis desde 2 vapers)`}
                    </p>
                    <p className="text-xs mt-1 text-neutral-500">Entrega estimada: 3–5 días laborables</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-6 mb-6">
              <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-4">Tus datos</h3>
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input-field"
                    placeholder="tu@email.com"
                  />
                  <p className="text-xs text-neutral-500 mt-1.5">Usaremos tu email únicamente para enviarte la confirmación del pedido.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    maxLength={9}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    onBlur={validatePhone}
                    className={`input-field ${phoneError ? 'border-red-500 focus:ring-red-500/30' : ''}`}
                    placeholder="Ej: 648574219"
                  />
                  {phoneError && (
                    <p className="text-xs text-red-400 mt-1.5">{phoneError}</p>
                  )}
                </div>

                {deliveryMethod === 'shipping' && (
                  <>
                    <div className="border-t border-neutral-700/50 pt-5">
                      <p className="text-xs font-bold tracking-[0.15em] uppercase text-neutral-500 mb-4">Dirección de entrega</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-neutral-400 mb-2">
                        Calle y número *
                      </label>
                      <input
                        type="text"
                        required={deliveryMethod === 'shipping'}
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="input-field"
                        placeholder="Ej: Calle Mayor 12, 3º B"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                          Ciudad *
                        </label>
                        <input
                          type="text"
                          required={deliveryMethod === 'shipping'}
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="input-field"
                          placeholder="Ej: Madrid"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-2">
                          Código postal *
                        </label>
                        <input
                          type="text"
                          required={deliveryMethod === 'shipping'}
                          inputMode="numeric"
                          maxLength={5}
                          value={formData.postalCode}
                          onChange={(e) => {
                            const value = e.target.value.replace(/[^\d]/g, '').slice(0, 5);
                            setFormData({ ...formData, postalCode: value });
                          }}
                          className="input-field"
                          placeholder="Ej: 28001"
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">
                    Notas (opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>

                <div className="bg-amber-900/20 border border-amber-800/30 rounded-2xl p-5">
                  <p className="text-sm text-amber-300">
                    <strong>Importante:</strong> Este pedido NO se paga automáticamente.
                    Recibirás un email de confirmación y te contactaremos para coordinar la entrega.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                >
                  {loading ? 'Enviando...' : (
                    <>
                      <Mail className="w-5 h-5" />
                      Confirmar pedido
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-white mb-8">Tu Carrito</h2>

          <div className="bg-neutral-900/60 border border-neutral-700/50 rounded-2xl p-6 mb-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-row gap-4 py-5 border-b border-neutral-600/30 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-2xl bg-neutral-900"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white mb-1 text-sm sm:text-base leading-snug">{item.product.name}</h3>
                    <p className="text-xs sm:text-sm text-neutral-500 mb-1">{item.product.flavor}</p>
                    <p className="text-white font-bold text-sm">{item.product.price.toFixed(2)}€</p>
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-1 bg-neutral-700 rounded-xl p-1 border border-neutral-600/50">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
                      >
                        <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                      <span className="w-7 sm:w-8 text-center font-bold text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg hover:bg-neutral-600 flex items-center justify-center transition-colors text-neutral-300"
                      >
                        <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-neutral-600 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-start justify-end">
                  <p className="font-bold text-base sm:text-lg text-white">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-neutral-900/60 border border-neutral-700/50 rounded-2xl p-6">
            {discount > 0 && (
              <div className="space-y-3 mb-6 pb-6 border-b border-neutral-600/30">
                <div className="flex justify-between text-neutral-500 text-sm">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)}€</span>
                </div>
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Descuento ({cart.reduce((total, item) => total + item.quantity, 0)}+ items)</span>
                  <span>-{discount.toFixed(2)}€</span>
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-white">Total</span>
              <span className="text-3xl font-bold text-white tracking-tight">{finalPrice.toFixed(2)}€</span>
            </div>
            <p className="text-xs text-neutral-500 mb-6">
              Envio disponible +{SHIPPING_BASE_COST.toFixed(2)}€ &middot; Gratis a partir de {FREE_SHIPPING_MIN_ITEMS} unidades
            </p>

            <button
              onClick={handleProceedToCheckout}
              className="w-full btn-primary py-4 text-base"
            >
              Proceder al pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
