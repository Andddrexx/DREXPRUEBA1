import { useState, useEffect } from 'react';
import { Product, Promotion } from '../types';
import { X, Minus, Plus, ShoppingCart, MessageCircle, TrendingDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { promotions as promotionsData } from '../data/products';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetail = ({ product, onClose }: ProductDetailProps) => {
  const [quantity, setQuantity] = useState(1);
  const [promotions] = useState<Promotion[]>(promotionsData);
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [savings, setSavings] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    calculatePrice();
  }, [quantity, promotions]);

  const calculatePrice = () => {
    let finalPrice = product.price * quantity;
    let totalSavings = 0;

    for (const promo of promotions) {
      if (quantity >= promo.quantity) {
        if (promo.discount_amount) {
          totalSavings = promo.discount_amount;
          finalPrice = product.price * quantity - totalSavings;
        }
      }
    }

    setTotalPrice(finalPrice);
    setSavings(totalSavings);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hola \nEstoy interesado en:\n Producto: ${product.name}\n Precio: ${product.price}€\n Confirmo que soy mayor de 18 años\n\n¿Puedes darme más información?`
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b flex justify-between items-center p-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>

              <div className="space-y-4 mb-6">
                <div className="border-l-4 border-green-600 pl-4">
                  <p className="text-sm font-semibold text-gray-600">Sabor/Aroma</p>
                  <p className="text-gray-800">{product.flavor}</p>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <p className="text-sm font-semibold text-gray-600">Formato</p>
                  <p className="text-gray-800">{product.format}</p>
                </div>

                <div className="border-l-4 border-green-600 pl-4">
                  <p className="text-sm font-semibold text-gray-600">Disponibilidad</p>
                  <p className="text-gray-800">
                    {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Sin stock'}
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Precio unitario:</p>
                  <span className="text-2xl font-bold text-gray-800">{product.price.toFixed(2)}€</span>
                </div>

                <div className="mt-4 space-y-2 mb-6">
                  {promotions.map((promo) => (
                    <div
                      key={promo.id}
                      className="flex items-center gap-2 text-sm bg-green-50 border border-green-200 rounded-lg p-2"
                    >
                      <TrendingDown className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span className="text-green-700 font-medium">{promo.description}</span>
                    </div>
                  ))}
                </div>

                {product.stock > 0 ? (
                  <>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-semibold text-gray-700">Cantidad:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-semibold">{quantity}</span>
                        <button
                          onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-lg transition"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 mb-1">Total por {quantity} unidad{quantity !== 1 ? 'es' : ''}:</p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-blue-700">{totalPrice.toFixed(2)}€</span>
                        {savings > 0 && (
                          <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                            Ahorras {savings.toFixed(2)}€
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={handleAddToCart}
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Añadir al carrito
                      </button>
                      <a
                        href={`https://wa.me/34681872420?text=${whatsappMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-lg transition"
                      >
                        <MessageCircle className="w-6 h-6" />
                      </a>
                    </div>
                  </>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-semibold cursor-not-allowed"
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
  );
};
