import { MessageCircle, Mail, Phone } from 'lucide-react';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-900 border-t border-neutral-700/50 text-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <img
              src="/assets/logo.png"
              alt="CBDREX"
              className="h-20 w-auto mb-5 cursor-pointer hover:opacity-80 transition rounded-xl"
              onClick={scrollToTop}
            />
            <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">
              Cannabis legal premium. Calidad garantizada para usuarios adultos responsables.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-600 mb-5">Enlaces</h3>
            <ul className="space-y-3">
              {['Politica de privacidad', 'Terminos y condiciones', 'Aviso legal'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-neutral-500 hover:text-white transition-colors duration-200">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-600 mb-5">Contacto</h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/34681872420"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-neutral-500 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors border border-neutral-600/50">
                  <MessageCircle className="w-4 h-4" />
                </div>
                +34 681 872 420
              </a>
              <a
                href="mailto:cbdrexstore@gmail.com"
                className="flex items-center gap-3 text-sm text-neutral-500 hover:text-white transition-colors duration-200 group"
              >
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors border border-neutral-600/50">
                  <Mail className="w-4 h-4" />
                </div>
                cbdrexstore@gmail.com
              </a>
              <div className="flex items-center gap-3 text-sm text-neutral-500">
                <div className="w-9 h-9 rounded-lg bg-neutral-800 flex items-center justify-center border border-neutral-600/50">
                  <Phone className="w-4 h-4" />
                </div>
                Lun - Sab: 10:00 - 20:00
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-700/50 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-neutral-600 text-xs tracking-wide">
            2026 CBDREX. Todos los derechos reservados. Cannabis legal en España.
          </p>
        </div>
      </div>
    </footer>
  );
};
