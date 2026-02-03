export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="bg-white px-3 py-1 rounded inline-block mb-4">
              <span className="font-bold text-xl text-black">CBDREX</span>
            </div>
            <p className="text-gray-400 text-sm">
              Cannabis legal premium. Calidad garantizada para usuarios adultos responsables.
            </p>
          </div>

          <div>
            <h3 className="font-bold mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Política de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Aviso legal
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WhatsApp: +34 681 872 420</li>
              <li>Email: cbdrexstore@gmail.com</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm">
          © 2026 CBDREX. Todos los derechos reservados. Cannabis legal en España.
        </p>
      </div>
    </footer>
  );
};
