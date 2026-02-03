import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = getTotalPrice();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const whatsappMessage = encodeURIComponent(
        `🛒 NUEVO PEDIDO\n\n` +
        `👤 Cliente: ${formData.name}\n` +
        `📧 Email: ${formData.email}\n` +
        `📱 Teléfono: ${formData.phone}\n\n` +
        `📦 PRODUCTOS:\n` +
        cart.map(item => `• ${item.product.name} x${item.quantity} - ${(item.product.price * item.quantity).toFixed(2)}€`).join('\n') +
        `\n\n💰 TOTAL: ${totalPrice.toFixed(2)}€\n\n` +
        (formData.notes ? `📝 Notas: ${formData.notes}\n\n` : '') +
        `✅ Confirmo que soy mayor de 18 años y acepto las condiciones de entrega en mano.`
      );

      window.open(`https://wa.me/34681872420?text=${whatsappMessage}`, '_blank');

      setOrderSuccess(true);
      clearCart();
      setFormData({ name: '', email: '', phone: '', notes: '' });

      setTimeout(() => {
        setOrderSuccess(false);
        setShowCheckout(false);
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">Añade productos para comenzar tu pedido</p>
          </div>
        </div>
      </div>
    );
  }

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Pedido Enviado!</h2>
          <p className="text-gray-600">
            Tu pedido ha sido registrado y enviado por WhatsApp. Te contactaremos pronto para confirmar.
          </p>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Finalizar Pedido</h2>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Resumen del pedido</h3>
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between py-2 border-b">
                  <span className="text-gray-700">
                    {item.product.name} x{item.quantity}
                  </span>
                  <span className="font-semibold">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-4 font-bold text-lg">
                <span>Total</span>
                <span className="text-green-700">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="font-bold text-lg mb-4">Tus datos</h3>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Importante:</strong> Este pedido NO se paga automáticamente.
                    Te contactaremos por WhatsApp para confirmar y coordinar la entrega en mano.
                  </p>
                  <p className="text-sm text-amber-800 mt-2">
                    <strong>Forma de pago:</strong> Efectivo en la entrega o transferencia tras confirmación.
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Volver al carrito
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-6 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    {loading ? 'Enviando...' : (
                      <>
                        <MessageCircle className="w-5 h-5" />
                        Enviar por WhatsApp
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Tu Carrito</h2>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            {cart.map((item) => (
              <div
                key={item.product.id}
                className="flex flex-col md:flex-row gap-4 py-4 border-b last:border-b-0"
              >
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-full md:w-32 h-32 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800">{item.product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.product.flavor}</p>
                  <p className="text-green-700 font-bold">{item.product.price.toFixed(2)}€</p>
                </div>

                <div className="flex md:flex-col items-center md:items-end gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 p-1 rounded transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="md:text-right">
                  <p className="font-bold text-lg">
                    {(item.product.price * item.quantity).toFixed(2)}€
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold text-gray-800">Total</span>
              <span className="text-2xl font-bold text-green-700">{totalPrice.toFixed(2)}€</span>
            </div>

            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
            >
              Proceder al pedido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
