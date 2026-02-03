import { ShoppingCart, Leaf, MessageCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Header = ({ onNavigate, currentPage }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <header className="bg-green-800 text-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-white px-3 py-1 rounded">
              <h1 className="text-2xl font-bold text-black">CBDREX</h1>
            </div>
            <p className="text-xs text-green-200 ml-2">Cannabis Legal +18</p>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`hover:text-green-200 transition ${
                currentPage === 'home' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Catálogo
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-green-200 transition ${
                currentPage === 'contact' ? 'text-green-200 font-semibold' : ''
              }`}
            >
              Contacto
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/34681872420?text=Hola%20%F0%9F%91%8B%0AGracias%20por%20contactar%20con%20CBDrex.%0AEste%20servicio%20es%20exclusivo%20para%20mayores%20de%2018%20a%C3%B1os%20y%20productos%20de%20cannabis%20legal%20(CBD%20/%20c%C3%A1%C3%B1amo).%0AIndica:%0A1%EF%B8%8F%E2%83%A3%20Producto%20que%20te%20interesa%0A2%EF%B8%8F%E2%83%A3%20Cantidad%0A3%EF%B8%8F%E2%83%A3%20Confirmaci%C3%B3n%20de%20que%20eres%20mayor%20de%20edad%0ATe%20responderemos%20lo%20antes%20posible."
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigate('cart')}
              className="relative bg-white text-green-800 p-2 rounded-lg hover:bg-green-100 transition"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
