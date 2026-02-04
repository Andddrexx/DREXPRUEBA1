import { useState, useEffect, useRef } from 'react';
import { ShoppingCart, MessageCircle, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  onScrollToSection?: (section: string) => void;
}

export const Header = ({ onNavigate, currentPage, onScrollToSection }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();
  const [showCatalogMenu, setShowCatalogMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowCatalogMenu(false);
      }
    };

    if (showCatalogMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCatalogMenu]);

  const handleCatalogClick = (section?: string) => {
    if (currentPage !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        if (section && onScrollToSection) {
          onScrollToSection(section);
        }
      }, 100);
    } else if (section && onScrollToSection) {
      onScrollToSection(section);
    }
    setShowCatalogMenu(false);
  };

  return (
    <header className="#FFFFFF">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.location.reload()}
          >
            <img
              src="/assets/logo.jpeg"
              alt="CBDREX"
              className="h-12 w-auto"
            />
            <p className="text-xs text-gray-400 ml-2">Cannabis Legal +18</p>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowCatalogMenu(!showCatalogMenu)}
                className={`flex items-center gap-1 hover:text-gray-300 transition ${
                  currentPage === 'home' ? 'text-gray-300 font-semibold' : ''
                }`}
              >
                Catálogo
                <ChevronDown className={`w-4 h-4 transition-transform ${showCatalogMenu ? 'rotate-180' : ''}`} />
              </button>

              {showCatalogMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[200px]">
                  <button
                    onClick={() => handleCatalogClick('vapers')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Vapers
                  </button>
                  <button
                    onClick={() => handleCatalogClick('mecheros')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Mecheros
                  </button>
                  <button
                    onClick={() => handleCatalogClick('accesorios')}
                    className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Estuches/Accesorios
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => onNavigate('contact')}
              className={`hover:text-gray-300 transition ${
                currentPage === 'contact' ? 'text-gray-300 font-semibold' : ''
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
              className="hidden md:flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onNavigate('cart')}
              className="relative bg-white text-black p-2 rounded-lg hover:bg-gray-200 transition"
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
