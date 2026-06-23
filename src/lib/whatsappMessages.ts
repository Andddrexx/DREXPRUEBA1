import { CartItem } from '../types';
import { DeliveryMethod } from '../context/CartContext';

export const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const formatProductName = (name: string) => {
  if (name.includes('Rollz')) {
    const match = name.match(/10-OH-HHC\s+(.+?)\s+\d+ml\s*–\s*Rollz/i);
    if (match) {
      return `Vape ${match[1].trim()}`;
    }
  }
  return name;
};

export const formatProductMessageForDetail = (name: string, price: number) => {
  const simplified = formatProductName(name);
  return `Hola, me interesa este producto:\nVape: ${simplified}\nPrecio: ${price}€\n¿Lo tienes disponible?`;
};

export const formatOrderMessage = (
  orderId: string,
  name: string,
  phone: string,
  cart: CartItem[],
  _subtotal: number,
  _discount: number,
  _shipping: number,
  final: number,
  notes: string,
  deliveryMethod: DeliveryMethod
) => {
  const productsList = cart
    .map(item => {
      const simplified = formatProductName(item.product.name);
      return `- ${simplified} ×${item.quantity}`;
    })
    .join('\n');

  const deliveryLabel = deliveryMethod === 'shipping' ? 'Envío' : 'Entrega en mano (Recogida)';

  let message = `Nuevo pedido #${orderId}\n`;
  message += `\nCliente: ${name}`;
  message += `\nTeléfono: ${phone}`;
  message += `\nEntrega: ${deliveryLabel}`;
  message += `\n\nProductos:\n${productsList}`;
  message += `\n\nTotal: ${final.toFixed(2)}€`;

  if (notes.trim()) {
    message += `\nNotas: ${notes}`;
  }

  return message;
};

export interface EmailOrderPayload {
  orderId: string;
  name: string;
  email: string;
  phone: string;
  items: { name: string; quantity: number; unitPrice: number; total: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  finalPrice: number;
  notes: string;
  deliveryMethod: string;
}

export const buildEmailPayload = (
  orderId: string,
  name: string,
  email: string,
  phone: string,
  cart: CartItem[],
  subtotal: number,
  discount: number,
  shipping: number,
  finalPrice: number,
  notes: string,
  deliveryMethod: DeliveryMethod
): EmailOrderPayload => ({
  orderId,
  name,
  email,
  phone,
  items: cart.map(item => ({
    name: formatProductName(item.product.name),
    quantity: item.quantity,
    unitPrice: item.product.price,
    total: item.product.price * item.quantity,
  })),
  subtotal,
  discount,
  shipping,
  finalPrice,
  notes,
  deliveryMethod: deliveryMethod === 'shipping' ? 'Envío' : 'Entrega en mano (Recogida)',
});
