import { useState } from 'react';
import { MessageCircle, Mail, Phone, MapPin, X, Clock, Shield } from 'lucide-react';
import { WhatsAppConsultModal } from '../components/WhatsAppConsultModal';

export const Contact = () => {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const whatsappMessage = encodeURIComponent(
    'Hola\n Gracias por contactar con CBDREX.\n Este servicio es exclusivo para mayores de 18 años y productos de cannabis legal (CBD / THC).\n Indica:\n 1. Producto que te interesa\n 2. Cantidad\n 3. Confirmacion de que eres mayor de edad\n Te responderemos lo antes posible.'
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-700 to-neutral-500 pt-28 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl font-bold text-white mb-3">Contacto</h2>
            <p className="text-neutral-500 text-lg max-w-md mx-auto">
              Estamos aqui para ayudarte. Contactanos por tu canal preferido.
            </p>
            <div className="divider-dark mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-8 hover:border-neutral-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-neutral-700 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">WhatsApp</h3>
                  <p className="text-sm text-neutral-500">Respuesta inmediata</p>
                </div>
              </div>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                La forma mas rapida de contactarnos. Respondemos en minutos.
              </p>
              <button
                onClick={() => setShowWhatsAppModal(true)}
                className="block text-center btn-primary w-full"
              >
                Abrir WhatsApp
              </button>
            </div>

            <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-8 hover:border-neutral-500/50 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-12 bg-neutral-700 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Email</h3>
                  <p className="text-sm text-neutral-500">Respuesta en 24h</p>
                </div>
              </div>
              <p className="text-neutral-400 mb-6 leading-relaxed">
                Envianos un correo y te responderemos lo antes posible.
              </p>
              <a
                href="mailto:cbdrexstore@gmail.com"
                className="block text-center btn-outline"
              >
                cbdrexstore@gmail.com
              </a>
            </div>
          </div>

          <div className="bg-neutral-800/60 border border-neutral-600/40 rounded-2xl p-8 mb-10">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6 text-center">Informacion Adicional</h3>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: Phone, title: 'Telefono', info: '+34 681 872 420', sub: 'Lunes a Sabado: 10:00 - 20:00' },
                { icon: MapPin, title: 'Entrega', info: 'Entrega en mano', sub: 'Verificacion de edad +18 obligatoria' },
                { icon: Clock, title: 'Horario', info: 'Lun - Sab: 10:00 - 20:00', sub: 'Domingo cerrado' },
                { icon: Shield, title: 'Legal', info: '100% legal en Espana', sub: 'THC menor a 0.2%' },
              ].map((item) => (
                <div key={item.title} className="flex gap-4 p-4 bg-neutral-700/50 rounded-xl border border-neutral-600/40">
                  <div className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-neutral-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1">{item.title}</h4>
                    <p className="text-neutral-400">{item.info}</p>
                    <p className="text-xs text-neutral-600 mt-1">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 bg-amber-900/20 border border-amber-800/30 rounded-2xl">
              <h4 className="font-bold text-amber-300 mb-3">Importante</h4>
              <ul className="space-y-2 text-sm text-amber-200/80">
                {[
                  'Todos nuestros productos son legales en Espana',
                  'Venta exclusiva a mayores de 18 anos',
                  'Se verificara la edad en el momento de la entrega',
                  'Entrega en mano con confirmacion previa',
                  'Pago en efectivo o transferencia tras confirmacion',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 text-white rounded-3xl p-10 text-center border border-neutral-600/40">
            <h3 className="font-display text-3xl font-bold mb-3">Tienes dudas?</h3>
            <p className="text-neutral-400 mb-8 max-w-md mx-auto">
              Nuestro equipo esta disponible para resolver todas tus preguntas sobre nuestros productos.
            </p>
            <button
              onClick={() => setShowWhatsAppModal(true)}
              className="inline-flex items-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-xl font-semibold hover:bg-neutral-200 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              Chatea con nosotros
            </button>
          </div>

          <WhatsAppConsultModal
            isOpen={showWhatsAppModal}
            onClose={() => setShowWhatsAppModal(false)}
          />
        </div>
      </div>
    </div>
  );
};
