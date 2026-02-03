import { MessageCircle, Mail, Phone, MapPin } from 'lucide-react';

export const Contact = () => {
  const whatsappMessage = encodeURIComponent(
    'Hola 👋\nGracias por contactar con CBDrex.\nEste servicio es exclusivo para mayores de 18 años y productos de cannabis legal (CBD / cáñamo).\nIndica:\n1️⃣ Producto que te interesa\n2️⃣ Cantidad\n3️⃣ Confirmación de que eres mayor de edad\nTe responderemos lo antes posible.'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Contacto</h2>
          <p className="text-gray-600 text-center mb-12">
            Estamos aquí para ayudarte. Contáctanos por tu canal preferido.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">WhatsApp</h3>
                  <p className="text-sm text-gray-600">Respuesta inmediata</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                La forma más rápida de contactarnos. Respondemos en minutos.
              </p>
              <a
                href={`https://wa.me/34681872420?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                Abrir WhatsApp
              </a>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <p className="text-sm text-gray-600">Respuesta en 24h</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Envíanos un correo y te responderemos lo antes posible.
              </p>
              <a
                href="mailto:cbdrexstore@gmail.com"
                className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition"
              >
                cbdrexstore@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="font-bold text-2xl mb-6 text-center">Información Adicional</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="bg-green-100 p-3 rounded-lg h-fit">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Teléfono</h4>
                  <p className="text-gray-700">+34 681 872 420</p>
                  <p className="text-sm text-gray-500 mt-1">Lunes a Sábado: 10:00 - 20:00</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-green-100 p-3 rounded-lg h-fit">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-bold mb-2">Entrega</h4>
                  <p className="text-gray-700">Entrega en mano</p>
                  <p className="text-sm text-gray-500 mt-1">Verificación de edad +18 obligatoria</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-amber-50 border border-amber-200 rounded-lg">
              <h4 className="font-bold text-lg mb-3">Importante</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Todos nuestros productos son legales en España</li>
                <li>• Venta exclusiva a mayores de 18 años</li>
                <li>• Se verificará la edad en el momento de la entrega</li>
                <li>• Entrega en mano con confirmación previa</li>
                <li>• Pago en efectivo o transferencia tras confirmación</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">¿Tienes dudas?</h3>
            <p className="mb-6">
              Nuestro equipo está disponible para resolver todas tus preguntas sobre nuestros productos.
            </p>
            <a
              href={`https://wa.me/34681872420?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
            >
              <MessageCircle className="w-5 h-5" />
              Chatea con nosotros
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
