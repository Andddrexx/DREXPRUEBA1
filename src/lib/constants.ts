export const WHATSAPP_NUMBER = '34681872420';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Hola 👋\nGracias por contactar con CBDrex.\nEste servicio es exclusivo para mayores de 18 años y productos de cannabis legal (CBD / cáñamo).\nIndica:\n1️⃣ Producto que te interesa\n2️⃣ Cantidad\n3️⃣ Confirmación de que eres mayor de edad\nTe responderemos lo antes posible.';

export const buildWhatsAppUrl = (message: string) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
};
