import { CartItem } from '../types';

export const generateOrderId = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

export const formatProductName = (name: string) => {
  // Simplify product name: "Vape Pen Desechable 10-OH-HHC MAC 1ml – Rollz" -> "Rollz 1ml – MAC"
  if (name.includes('Rollz')) {
    const match = name.match(/(?:(\w+)\s+)?(\d+ml).*?–\s*(.+?)(?:\s*–\s*Rollz)?$/);
    if (match) {
      return `Rollz ${match[2]} – ${match[3].trim()}`;
    }
  }
  return name;
};

export const formatProductMessageForDetail = (name: string, price: number) => {
  const simplified = formatProductName(name);
  return `Hola, me interesa este producto:\nVape: ${simplified}\nPrecio: ${price}€\n¿Lo tienes disponible?`;
};

export const formatOrderMessage = (
  name: string,
  phone: string,
  cart: CartItem[],
  subtotal: number,
  discount: number,
  final: number,
  notes: string
) => {
  const orderId = generateOrderId();

  const productsList = cart
    .map(item => {
      const simplified = formatProductName(item.product.name);
      const itemTotal = (item.product.price * item.quantity).toFixed(2);
      return `• ${simplified} ×${item.quantity} → ${itemTotal}€`;
    })
    .join('\n');

  let message = ` NUEVO PEDIDO #${orderId}\n`;
  message += `\n Cliente: ${name}`;
  message += `\n Teléfono: ${phone}`;
  message += `\n\n PRODUCTOS:\n${productsList}`;
  message += `\n\n Subtotal: ${subtotal.toFixed(2)}€`;

  if (discount > 0) {
    message += `\n Descuento: -${discount.toFixed(2)}€`;
  }

  message += `\n Total: ${final.toFixed(2)}€`;

  if (notes.trim()) {
    message += `\n\n Notas: ${notes}`;
  }

  message += `\n\n Estado: Pendiente de confirmación`;

  return message;
};
